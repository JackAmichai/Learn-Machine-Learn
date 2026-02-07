import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { Controls } from './Controls';

// Mock dependencies
vi.mock('./Tooltip', () => ({
  Tooltip: ({ word }) => <span>{word}</span>
}));
vi.mock('./CodeExport', () => ({
  CodeExport: () => <div>CodeExport</div>
}));

describe('Controls Security', () => {
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

  it('prevents upload of files larger than 5MB', async () => {
    const { getByTestId } = render(<Controls {...mockProps} />);
    const fileInput = getByTestId('file-upload');

    // Create a large fake file
    // Override size property to simulate 5MB+
    const largeFile = new File(['dummy content'], 'large_model.json', { type: 'application/json' });
    Object.defineProperty(largeFile, 'size', { value: 5 * 1024 * 1024 + 1 });

    // Trigger change event
    fireEvent.change(fileInput, { target: { files: [largeFile] } });

    // Wait for potential async operations
    await new Promise(resolve => setTimeout(resolve, 100));

    // Expect importModelJSON NOT to be called
    expect(mockProps.importModelJSON).not.toHaveBeenCalled();

    // Expect error message
    // Note: The error message might need to be exact or regex
    // We expect "File too large" or similar
    const status = screen.queryByRole('status');
    expect(status).toHaveTextContent(/File too large/i);
  });

  it('allows upload of valid small files', async () => {
    const { getByTestId } = render(<Controls {...mockProps} />);
    const fileInput = getByTestId('file-upload');

    const smallFile = new File(['{"valid": true}'], 'small_model.json', { type: 'application/json' });

    fireEvent.change(fileInput, { target: { files: [smallFile] } });

    await waitFor(() => {
        expect(mockProps.importModelJSON).toHaveBeenCalled();
    });
  });
});
