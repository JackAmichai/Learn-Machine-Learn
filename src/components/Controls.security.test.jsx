import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { Controls } from './Controls';

// Mock Tooltip
vi.mock('./Tooltip', () => ({
  Tooltip: ({ word }) => <span>{word}</span>
}));

// Mock CodeExport
vi.mock('./CodeExport', () => ({
  CodeExport: () => <div>CodeExport</div>
}));

describe('Controls Security Tests', () => {
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

  let readAsTextMock;

  beforeEach(() => {
    readAsTextMock = vi.fn();

    // Mock window.FileReader
    vi.stubGlobal('FileReader', class {
      constructor() {
        this.readAsText = readAsTextMock;
        this.result = '';
        this.onload = null;
      }
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('blocks files larger than 5MB', async () => {
    render(<Controls {...mockProps} />);

    const fileInput = screen.getByTestId('file-upload');

    const largeFile = new File([''], 'large-model.json', { type: 'application/json' });
    Object.defineProperty(largeFile, 'size', { value: 6 * 1024 * 1024 });

    fireEvent.change(fileInput, { target: { files: [largeFile] } });

    // Ensure FileReader.readAsText is NOT called
    expect(readAsTextMock).not.toHaveBeenCalled();

    // Check for error message
    const statusMessage = await screen.findByRole('status');
    expect(statusMessage).toHaveTextContent(/exceeds 5MB limit/i);
  });

  it('allows files smaller than 5MB', () => {
    render(<Controls {...mockProps} />);

    const fileInput = screen.getByTestId('file-upload');

    const smallFile = new File(['{}'], 'small-model.json', { type: 'application/json' });
    // Size is naturally small

    fireEvent.change(fileInput, { target: { files: [smallFile] } });

    // Ensure FileReader.readAsText IS called
    expect(readAsTextMock).toHaveBeenCalledWith(smallFile);
  });
});
