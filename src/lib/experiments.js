/**
 * Experiment tracking — a tiny, localStorage-backed run log so learners can
 * compare hyperparameter choices across runs.
 *
 * Intentionally <1KB per run. We store only scalars and a thinned loss curve,
 * never model weights. The store is capped at MAX_EXPERIMENTS to stay under
 * the 5MB localStorage limit even across dozens of sessions.
 */

const STORAGE_KEY = 'lml:experiments:v1';
const MAX_EXPERIMENTS = 50;
const MAX_CURVE_POINTS = 100;

/** Compress an array to at most `max` points by even-index sampling. */
function thin(arr, max = MAX_CURVE_POINTS) {
    if (!Array.isArray(arr)) return [];
    if (arr.length <= max) return arr.slice();
    const step = arr.length / max;
    const out = [];
    for (let i = 0; i < max; i++) out.push(arr[Math.floor(i * step)]);
    return out;
}

function readRaw() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

function writeRaw(list) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (err) {
        // Quota exceeded — drop oldest half and retry once
        try {
            const trimmed = list.slice(-Math.floor(list.length / 2));
            localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
        } catch {
            console.warn('Could not persist experiments:', err);
        }
    }
}

export function listExperiments() {
    // newest first
    return readRaw().slice().sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
}

export function saveExperiment(exp) {
    const record = {
        id: exp.id || `run_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        createdAt: Date.now(),
        name: exp.name || 'Untitled run',
        dataset: exp.dataset || 'unknown',
        task: exp.task || 'unknown',
        nFeatures: exp.nFeatures ?? null,
        nTrain: exp.nTrain ?? null,
        nTest: exp.nTest ?? null,
        architecture: exp.architecture || [],
        hyperparams: exp.hyperparams || {},
        finalLoss: exp.finalLoss ?? null,
        finalTestLoss: exp.finalTestLoss ?? null,
        finalAccuracy: exp.finalAccuracy ?? null,
        finalTestAccuracy: exp.finalTestAccuracy ?? null,
        trainTimeMs: exp.trainTimeMs ?? null,
        lossCurve: thin(exp.lossCurve || []),
        notes: exp.notes || '',
    };
    const list = readRaw();
    list.push(record);
    // Cap
    while (list.length > MAX_EXPERIMENTS) list.shift();
    writeRaw(list);
    return record;
}

export function deleteExperiment(id) {
    writeRaw(readRaw().filter(r => r.id !== id));
}

export function clearExperiments() {
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* noop */ }
}

/** Export all experiments as a JSON blob (for users to share/compare). */
export function exportExperimentsJSON() {
    return JSON.stringify(listExperiments(), null, 2);
}
