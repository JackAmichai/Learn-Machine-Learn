/**
 * Minimal, dependency-free CSV parser + column profiler.
 *
 * Accepts comma or semicolon delimiters, quoted fields, trailing empty lines.
 * Intended for small/medium educational datasets — not for multi-GB files.
 *
 * Returns { headers, rows, profile } where `profile[col]` is:
 *   { kind: 'numeric', min, max, mean, std, missing, n, uniques }
 *   { kind: 'categorical', classes: string[], counts: number[], missing, n }
 */

function splitLine(line, delim) {
    const out = [];
    let buf = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if (ch === '"') {
            if (inQuotes && line[i + 1] === '"') { buf += '"'; i++; } // escaped
            else { inQuotes = !inQuotes; }
        } else if (ch === delim && !inQuotes) {
            out.push(buf);
            buf = '';
        } else {
            buf += ch;
        }
    }
    out.push(buf);
    return out.map(s => s.trim());
}

function detectDelimiter(text) {
    const firstLine = text.split(/\r?\n/, 1)[0] || '';
    const commas = (firstLine.match(/,/g) || []).length;
    const semis = (firstLine.match(/;/g) || []).length;
    const tabs = (firstLine.match(/\t/g) || []).length;
    if (tabs > commas && tabs > semis) return '\t';
    if (semis > commas) return ';';
    return ',';
}

/** Parses a CSV string. Max rows capped at 20000 for browser safety. */
export function parseCSV(text, { maxRows = 20000 } = {}) {
    if (!text || typeof text !== 'string') {
        return { headers: [], rows: [], profile: {}, truncated: false };
    }
    const delim = detectDelimiter(text);
    const lines = text.split(/\r?\n/).filter(l => l.trim().length > 0);
    if (lines.length < 2) return { headers: [], rows: [], profile: {}, truncated: false };

    const headers = splitLine(lines[0], delim).map((h, i) => h || `col_${i}`);
    const dataLines = lines.slice(1, 1 + maxRows);
    const truncated = lines.length - 1 > maxRows;
    const rows = dataLines.map(l => splitLine(l, delim));

    return { headers, rows, profile: profileColumns(headers, rows), truncated };
}

function isNumericToken(s) {
    if (s === '' || s == null) return false;
    // reject things like "3.14.15", allow leading +/- and exponents
    return /^[-+]?\d*\.?\d+(?:[eE][-+]?\d+)?$/.test(s);
}

function profileColumns(headers, rows) {
    const profile = {};
    headers.forEach((h, colIdx) => {
        const vals = rows.map(r => r[colIdx] ?? '');
        const nonMissing = vals.filter(v => v !== '');
        const missing = vals.length - nonMissing.length;
        const numericLike = nonMissing.filter(isNumericToken);

        // Heuristic: column is "numeric" if ≥ 90% of non-missing values parse as numbers.
        if (nonMissing.length > 0 && numericLike.length / nonMissing.length >= 0.9) {
            const nums = numericLike.map(Number);
            const min = Math.min(...nums);
            const max = Math.max(...nums);
            const mean = nums.reduce((a, b) => a + b, 0) / nums.length;
            const variance = nums.reduce((a, b) => a + (b - mean) ** 2, 0) / nums.length;
            profile[h] = {
                kind: 'numeric',
                min, max, mean,
                std: Math.sqrt(variance),
                missing,
                n: nums.length,
                uniques: new Set(nums).size,
            };
        } else {
            const counts = new Map();
            nonMissing.forEach(v => counts.set(v, (counts.get(v) || 0) + 1));
            const classes = [...counts.keys()].sort();
            profile[h] = {
                kind: 'categorical',
                classes,
                counts: classes.map(c => counts.get(c)),
                missing,
                n: nonMissing.length,
            };
        }
    });
    return profile;
}

/**
 * Build training tensors given chosen feature columns and a target column.
 * Categorical features → one-hot. Categorical target → class index (classification).
 * Numeric features → z-score normalized. Numeric target → min-max normalized (kept for regression).
 *
 * Returns { X: number[][], y: number[][] | number[], meta }.
 * We keep it as plain arrays here; the caller converts to TF tensors.
 */
export function buildDataset({ headers, rows, profile, featureCols, targetCol }) {
    if (!featureCols || featureCols.length === 0 || !targetCol) {
        throw new Error('Pick at least one feature column and one target column.');
    }
    if (featureCols.includes(targetCol)) {
        throw new Error('Target column cannot also be a feature.');
    }

    const colIdx = (h) => headers.indexOf(h);
    const tIdx = colIdx(targetCol);
    const tProf = profile[targetCol];
    const isClassification = tProf.kind === 'categorical';

    // Filter rows with any missing cells in selected columns
    const selected = rows.filter(r => {
        if ((r[tIdx] ?? '') === '') return false;
        return featureCols.every(fc => (r[colIdx(fc)] ?? '') !== '');
    });

    if (selected.length < 4) {
        throw new Error('Not enough clean rows in the selected columns (need at least 4).');
    }

    // Build feature matrix
    const featureMeta = featureCols.map(fc => {
        const p = profile[fc];
        if (p.kind === 'numeric') {
            return { kind: 'numeric', col: fc, mean: p.mean, std: p.std || 1 };
        }
        return { kind: 'categorical', col: fc, classes: p.classes };
    });

    const X = selected.map(r => {
        const row = [];
        featureMeta.forEach(fm => {
            const raw = r[colIdx(fm.col)];
            if (fm.kind === 'numeric') {
                row.push((Number(raw) - fm.mean) / fm.std);
            } else {
                // one-hot
                fm.classes.forEach(c => row.push(raw === c ? 1 : 0));
            }
        });
        return row;
    });

    let y, classes = null, yMin = 0, yMax = 1;
    if (isClassification) {
        classes = tProf.classes;
        // one-hot targets for multi-class, plain 0/1 for binary (still use one-hot col for simplicity)
        y = selected.map(r => {
            const v = r[tIdx];
            return classes.map(c => (c === v ? 1 : 0));
        });
    } else {
        yMin = tProf.min;
        yMax = tProf.max;
        const span = (yMax - yMin) || 1;
        y = selected.map(r => [(Number(r[tIdx]) - yMin) / span]);
    }

    // Train/test split — 80/20, shuffled deterministically
    const n = X.length;
    const indices = [...Array(n).keys()];
    // deterministic shuffle (Fisher-Yates with seeded PRNG based on n)
    let seed = 1337;
    const rand = () => {
        seed = (seed * 9301 + 49297) % 233280;
        return seed / 233280;
    };
    for (let i = n - 1; i > 0; i--) {
        const j = Math.floor(rand() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    const nTrain = Math.max(2, Math.floor(n * 0.8));
    const trainIdx = indices.slice(0, nTrain);
    const testIdx = indices.slice(nTrain);

    const pick = (src, ix) => ix.map(i => src[i]);

    return {
        X_train: pick(X, trainIdx),
        y_train: pick(y, trainIdx),
        X_test: pick(X, testIdx),
        y_test: pick(y, testIdx),
        meta: {
            task: isClassification ? 'classification' : 'regression',
            featureDim: X[0].length,
            outputDim: isClassification ? classes.length : 1,
            classes,
            yMin,
            yMax,
            featureMeta,
            nTrain: trainIdx.length,
            nTest: testIdx.length,
        }
    };
}

/**
 * A small built-in dataset for "I just want to try it" flow — Iris-like,
 * hand-crafted so we don't need a network fetch.
 */
export const DEMO_CSV = `sepal_length,sepal_width,petal_length,petal_width,species
5.1,3.5,1.4,0.2,setosa
4.9,3.0,1.4,0.2,setosa
4.7,3.2,1.3,0.2,setosa
4.6,3.1,1.5,0.2,setosa
5.0,3.6,1.4,0.2,setosa
5.4,3.9,1.7,0.4,setosa
4.6,3.4,1.4,0.3,setosa
5.0,3.4,1.5,0.2,setosa
4.4,2.9,1.4,0.2,setosa
4.9,3.1,1.5,0.1,setosa
7.0,3.2,4.7,1.4,versicolor
6.4,3.2,4.5,1.5,versicolor
6.9,3.1,4.9,1.5,versicolor
5.5,2.3,4.0,1.3,versicolor
6.5,2.8,4.6,1.5,versicolor
5.7,2.8,4.5,1.3,versicolor
6.3,3.3,4.7,1.6,versicolor
4.9,2.4,3.3,1.0,versicolor
6.6,2.9,4.6,1.3,versicolor
5.2,2.7,3.9,1.4,versicolor
6.3,3.3,6.0,2.5,virginica
5.8,2.7,5.1,1.9,virginica
7.1,3.0,5.9,2.1,virginica
6.3,2.9,5.6,1.8,virginica
6.5,3.0,5.8,2.2,virginica
7.6,3.0,6.6,2.1,virginica
4.9,2.5,4.5,1.7,virginica
7.3,2.9,6.3,1.8,virginica
6.7,2.5,5.8,1.8,virginica
7.2,3.6,6.1,2.5,virginica
`;
