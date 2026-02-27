import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { Controls } from './Controls';

// Mock dependencies
vi.mock('./Tooltip', () => ({
  Tooltip: ({ word }) => <span>{word}</span>
}));

vi.mock('./CodeExport', () => ({
  CodeExport: () => <div>CodeExport</div>
}));

describe('Controls Security - File Upload', () => {
  const mockProps = {
    // Basic props required for rendering
    isPlaying: false,
    setIsPlaying: vi.fn(),
    epoch: 0,
    loss: 0,
    structure: [2, 4, 1],
    addLayer: vi.fn(),
    removeLayer: vi.fn(),
    updateNodeCount: vi.fn(),
    datasetParams: { type: 'spiral', noise: 0 },
    setDatasetParams: vi.fn(),
    mode: 'simple',
    setMode: vi.fn(),
    hyperparams: {
        learningRate: 0.1,
        activation: 'relu',
        optimizer: 'adam',
        batchSize: 32,
        gradientClip: 0
    },
    updateHyperparams: vi.fn(),
    trainingMode: 'continuous',
    setTrainingMode: vi.fn(),
    slowDelay: 500,
    setSlowDelay: vi.fn(),
    stepState: { status: 'idle' },
    runForwardPass: vi.fn(),
    runBackwardPass: vi.fn(),
    saveModelToLocal: vi.fn(),
    loadModelFromLocal: vi.fn(),
    exportModelJSON: vi.fn(),
    importModelJSON: vi.fn(),
    layerFeatures: {},
    updateLayerFeatures: vi.fn()
  };

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should block files larger than 5MB', async () => {
    const user = userEvent.setup();
    render(<Controls {...mockProps} />);

    // Create a large file (5MB + 1 byte)
    const largeContent = new Array(5 * 1024 * 1024 + 1).fill('a').join('');
    const largeFile = new File([largeContent], 'large-model.json', { type: 'application/json' });

    // We need to trigger the file input.
    // In Controls.jsx, the file input is hidden and triggered by a button: <button onClick={() => fileInputRef.current?.click()}>Import JSON</button>
    // However, for testing, we can target the input directly if we can find it, or simulate the upload on the input.
    // The input has `type="file"`, `accept="application/json"`, and `style={{ display: 'none' }}`.
    // We can't click it directly with userEvent if it's hidden, but we can use `upload`.

    // Find the file input (it might be hidden, so we look for it by label or just by selector if needed,
    // but Controls.jsx doesn't label it explicitly for finding. It does have handleImportFile attached).
    // Let's rely on the container structure or add a data-testid if needed.
    // Looking at Controls.jsx: <input ref={fileInputRef} type="file" ... />

    // We can select by display value being none? No.
    // Let's try to find it by type.
    const fileInput = document.querySelector('input[type="file"]');

    await user.upload(fileInput, largeFile);

    // Expect importModelJSON NOT to be called
    expect(mockProps.importModelJSON).not.toHaveBeenCalled();

    // Expect an error message to appear in the status area
    // The status area renders: <div className={`persist-status ${persistStatus.type}`}>{persistStatus.text}</div>
    await waitFor(() => {
        const status = screen.getByRole('status');
        expect(status).toHaveTextContent(/File too large/i);
    });
  });

  it('should accept valid small files', async () => {
    const user = userEvent.setup();
    render(<Controls {...mockProps} />);

    const validContent = JSON.stringify({ valid: true });
    const validFile = new File([validContent], 'model.json', { type: 'application/json' });

    const fileInput = document.querySelector('input[type="file"]');
    await user.upload(fileInput, validFile);

    // The FileReader logic is async. We need to wait.
    // Since we are in JSDOM, FileReader works but we might need to rely on the load event.
    // The previous test suite might have mocked FileReader or not.
    // JSDOM has a basic FileReader implementation.

    await waitFor(() => {
        expect(mockProps.importModelJSON).toHaveBeenCalled();
    });

    const status = screen.getByRole('status');
    expect(status).toHaveTextContent(/Imported model.json/i);
  });
});
