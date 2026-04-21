import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { StatsPanel } from './StatsPanel';

// Mock TensorFlow.js
vi.mock('@tensorflow/tfjs', () => {
  return {
    tidy: (fn) => fn(),
    tensor: (data) => ({
      dataSync: () => data,
      dispose: vi.fn()
    }),
    keep: (t) => t,
    dispose: vi.fn()
  };
});

describe('StatsPanel Component', () => {
  const mockModel = {
    model: {}, // Just needs to be truthy
    predict: vi.fn(() => ({
      dataSync: () => [0.1, 0.9, 0.2, 0.8], // Preds: 0, 1, 0, 1
      dispose: vi.fn()
    }))
  };

  const mockData = {
    xs: {}, // Truthy
    labels: [0, 1, 1, 0] // Actuals: 0, 1, 1, 0
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders confusion matrix with accessible ARIA roles', async () => {
    render(
      <StatsPanel
        model={mockModel}
        data={mockData}
        modelVersion={1}
        epoch={10}
        loss={0.5}
      />
    );

    // Wait for metrics to be computed (there's a 100ms debounce in StatsPanel)
    await waitFor(() => {
      expect(screen.getByText('Advanced Metrics')).toBeInTheDocument();
    });

    // Expand the panel (it defaults to expanded=true)
    const button = screen.getByRole('button', { name: /Advanced Metrics/i });
    expect(button).toHaveAttribute('aria-expanded', 'true');

    // Wait for confusion matrix to appear
    await waitFor(() => {
      expect(screen.getByRole('table', { name: /Confusion Matrix/i })).toBeInTheDocument();
    }, { timeout: 2000 });

    // Check for rows
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBeGreaterThan(0);

    // Check for column headers
    const colHeaders = screen.getAllByRole('columnheader');
    expect(colHeaders.length).toBeGreaterThan(0);
    expect(colHeaders[1]).toHaveTextContent('Pred 0');

    // Check for row headers
    const rowHeaders = screen.getAllByRole('rowheader');
    expect(rowHeaders.length).toBeGreaterThan(0);
    expect(rowHeaders[0]).toHaveTextContent('Actual 0');

    // Check for cells
    const cells = screen.getAllByRole('cell');
    expect(cells.length).toBeGreaterThan(0);
  });
});
