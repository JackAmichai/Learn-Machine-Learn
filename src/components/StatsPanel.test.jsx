import { render, screen, waitFor } from '@testing-library/react';
import { StatsPanel } from './StatsPanel';
import { vi, describe, it, expect } from 'vitest';

// Mock TensorFlow.js
vi.mock('@tensorflow/tfjs', () => ({
    tidy: (fn) => fn(),
    tensor: (data) => ({
        dataSync: () => data,
        dispose: () => {}
    })
}));

describe('StatsPanel Accessibility', () => {
    const mockModel = {
        predict: vi.fn(() => ({
            dataSync: () => new Float32Array([0.1, 0.9, 0.1, 0.9]) // Predictions: 0, 1, 0, 1
        })),
        model: {} // required check in computeMetrics
    };

    const mockData = {
        xs: {}, // mock tensor
        labels: [0, 1, 1, 0] // Actual: 0, 1, 1, 0
        // Predictions: 0, 1, 0, 1
        // Index 0: Pred 0, Actual 0 -> TN
        // Index 1: Pred 1, Actual 1 -> TP
        // Index 2: Pred 0, Actual 1 -> FN
        // Index 3: Pred 1, Actual 0 -> FP
        // Counts: TN=1, TP=1, FN=1, FP=1
    };

    it('renders confusion matrix with correct accessibility roles', async () => {
        render(
            <StatsPanel
                model={mockModel}
                data={mockData}
                modelVersion={1}
                epoch={10}
                loss={0.5}
            />
        );

        // Wait for metrics to compute (there is a debounce)
        await waitFor(() => {
            // Check for one of the cell titles to ensure rendering happened
            expect(screen.getByTitle('True Positive')).toBeInTheDocument();
        });

        const table = screen.getByRole('table', { name: /confusion matrix/i });
        expect(table).toBeInTheDocument();

        // Check for rows (header + 2 data rows = 3 rows)
        const rows = screen.getAllByRole('row');
        expect(rows.length).toBe(3);

        // Check for column headers (Pred 0, Pred 1)
        const colHeaders = screen.getAllByRole('columnheader');
        expect(colHeaders.length).toBe(2);

        // Check for row headers (Actual 0, Actual 1)
        const rowHeaders = screen.getAllByRole('rowheader');
        expect(rowHeaders.length).toBe(2);

        // Check for cells
        const cells = screen.getAllByRole('cell');
        expect(cells.length).toBe(4); // TN, FP, FN, TP

        // Check tabIndex
        cells.forEach(cell => {
            expect(cell).toHaveAttribute('tabIndex', '0');
        });

        // Check aria-labels
        // Since counts are all 1 based on my mock data
        // Using partial match because the label might be "True Positive: 1"
        expect(screen.getByLabelText(/True Positive: 1/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/False Positive: 1/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/True Negative: 1/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/False Negative: 1/i)).toBeInTheDocument();
    });
});
