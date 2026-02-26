import { render, screen, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { StatsPanel } from './StatsPanel';

// Mock TensorFlow.js
vi.mock('@tensorflow/tfjs', () => {
    return {
        tidy: (fn) => fn(),
        tensor: (data) => ({
            dataSync: () => data,
            dispose: () => {}
        })
    };
});

// Mock Tooltip component to avoid testing its internal logic
vi.mock('./Tooltip', () => ({
    Tooltip: ({ word }) => <span>{word}</span>
}));

describe('StatsPanel', () => {
    const mockModel = {
        model: {}, // Presence check
        predict: vi.fn()
    };

    const mockData = {
        xs: {}, // Presence check
        labels: [0, 1, 0, 1] // 4 samples
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders confusion matrix with correct accessibility roles', async () => {
        // Mock prediction: [0.1, 0.9, 0.2, 0.8] -> [0, 1, 0, 1] (Perfect predictions)
        mockModel.predict.mockReturnValue({
            dataSync: () => [0.1, 0.9, 0.2, 0.8]
        });

        await act(async () => {
            render(
                <StatsPanel
                    model={mockModel}
                    data={mockData}
                    modelVersion={1}
                    epoch={10}
                    loss={0.05}
                />
            );
        });

        // Wait for metrics to be computed (debounced)
        await waitFor(() => {
            expect(screen.getByText('Advanced Metrics')).toBeInTheDocument();
            // Check for accuracy to ensure metrics are rendered (might be multiple 100.0%)
            expect(screen.getAllByText('100.0%').length).toBeGreaterThan(0);
        });

        // Check for Table Structure Roles
        // The table container
        const table = screen.getByRole('table', { name: /confusion matrix/i });
        expect(table).toBeInTheDocument();

        // Check for Column Headers
        const colHeaders = screen.getAllByRole('columnheader');
        expect(colHeaders).toHaveLength(2);
        expect(colHeaders[0]).toHaveTextContent('Pred 0');
        expect(colHeaders[1]).toHaveTextContent('Pred 1');

        // Check for Row Headers
        const rowHeaders = screen.getAllByRole('rowheader');
        expect(rowHeaders).toHaveLength(2);
        expect(rowHeaders[0]).toHaveTextContent('Actual 0');
        expect(rowHeaders[1]).toHaveTextContent('Actual 1');

        // Check for Cells
        const cells = screen.getAllByRole('cell');
        expect(cells).toHaveLength(4);

        // Check Accessibility Attributes on Cells
        cells.forEach(cell => {
            expect(cell).toHaveAttribute('tabIndex', '0');
            expect(cell).toHaveAttribute('aria-label');
        });
    });
});
