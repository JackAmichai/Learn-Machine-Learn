import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { Controls } from './Controls';

// Mock Tooltip
vi.mock('./Tooltip', () => ({
  Tooltip: ({ word }) => <span>{word}</span>
}));

// Mock CodeExport
vi.mock('./CodeExport', () => ({
  CodeExport: () => <div>CodeExport</div>
}));

describe('Controls Component Security', () => {
  const mockProps = {
    isPlaying: false,
    setIsPlaying: vi.fn(),
    epoch: 0,
    loss: 0.5,
    structure: [2, 4, 1],
    addLayer: vi.fn(),
    removeLayer: vi.fn(),
    updateNodeCount: vi.fn(),
    datasetParams: { type: 'spiral', noise: 0 },
    setDatasetParams: vi.fn(),
    mode: 'simple',
    setMode: vi.fn(),
    hyperparams: {
      learningRate: 0.01,
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
    layerFeatures: {
      1: { batchNorm: false, dropout: false, dropoutRate: 0.2 }
    },
    updateLayerFeatures: vi.fn()
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('prevents importing files larger than 5MB', async () => {
    render(<Controls {...mockProps} />);

    // Mock FileReader methods
    const readAsTextMock = vi.fn();

    // Class-based mock for FileReader
    class MockFileReader {
      constructor() {
        this.readAsText = readAsTextMock;
        this.onload = null;
        this.result = '{}';
      }
    }

    window.FileReader = MockFileReader;

    // Create a large file
    const file = new File(['x'.repeat(10)], 'large_model.json', { type: 'application/json' });

    // Override the size property
    Object.defineProperty(file, 'size', { value: 6 * 1024 * 1024 }); // 6MB

    // Find the file input
    // The input is hidden, so we might need to select by selector or role if visible,
    // but here it's `display: none`. Let's use querySelector or getByLabelText if possible.
    // Looking at Controls.jsx: <input ref={fileInputRef} type="file" ... style={{ display: 'none' }} />
    // It doesn't have an ID or label associated that is easily accessible.
    // However, it has `type="file"`.
    // Wait, `testing-library` recommends `userEvent.upload`, but `fireEvent.change` works too.
    // Since it's hidden, we can use `container.querySelector('input[type="file"]')`.

    const { container } = render(<Controls {...mockProps} />);
    const input = container.querySelector('input[type="file"]');

    fireEvent.change(input, { target: { files: [file] } });

    // Expect importModelJSON NOT to be called
    expect(readAsTextMock).not.toHaveBeenCalled();
    expect(mockProps.importModelJSON).not.toHaveBeenCalled();

    // Expect an error message
    // The component sets status: setStatus('error', err.message);
    // We expect "File too large (max 5MB)"
    await waitFor(() => {
        const status = screen.getByRole('status');
        expect(status).toHaveTextContent(/File too large/i);
        expect(status).toHaveClass('error');
    });
  });

  it('allows importing files smaller than 5MB', async () => {
    // Setup valid file
    const fileContent = JSON.stringify({ version: 1 });
    const file = new File([fileContent], 'model.json', { type: 'application/json' });

    const readAsTextMock = vi.fn(function() {
        // Trigger onload
        this.result = fileContent;
        if (this.onload) this.onload();
    });

    class MockFileReader {
      constructor() {
        this.readAsText = readAsTextMock;
        this.onload = null;
        this.result = '';
      }
    }

    window.FileReader = MockFileReader;

    const { container } = render(<Controls {...mockProps} />);
    const input = container.querySelector('input[type="file"]');

    fireEvent.change(input, { target: { files: [file] } });

    expect(readAsTextMock).toHaveBeenCalledWith(file);
    expect(mockProps.importModelJSON).toHaveBeenCalledWith(fileContent);

    await waitFor(() => {
        const status = screen.getByRole('status');
        expect(status).toHaveTextContent(/Imported model.json/i);
        expect(status).toHaveClass('success');
    });
  });
});
