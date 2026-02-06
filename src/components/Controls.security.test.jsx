import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { Controls } from './Controls';

// Mock child components
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

  it('rejects files larger than 5MB', async () => {
    render(<Controls {...mockProps} />);

    const fileInput = screen.getByTestId('file-upload');

    // Create a mock file larger than 5MB
    const largeFile = new File(['x'.repeat(10)], 'large_model.json', { type: 'application/json' });
    Object.defineProperty(largeFile, 'size', { value: 6 * 1024 * 1024 }); // 6MB

    fireEvent.change(fileInput, { target: { files: [largeFile] } });

    // Expect error message
    expect(await screen.findByText(/File too large \(max 5MB\)/i)).toBeInTheDocument();

    // Ensure importModelJSON was NOT called
    expect(mockProps.importModelJSON).not.toHaveBeenCalled();
  });

  it('allows files smaller than 5MB', async () => {
    const readAsTextMock = vi.fn();

    class MockFileReader {
      constructor() {
        this.readAsText = readAsTextMock;
        this.onload = null;
        this.result = JSON.stringify({ test: true });
        MockFileReader.instance = this;
      }
    }

    const originalFileReader = window.FileReader;
    window.FileReader = MockFileReader;

    try {
      render(<Controls {...mockProps} />);

      const fileInput = screen.getByTestId('file-upload');
      const smallFile = new File([JSON.stringify({ test: true })], 'model.json', { type: 'application/json' });
      Object.defineProperty(smallFile, 'size', { value: 1024 }); // 1KB

      fireEvent.change(fileInput, { target: { files: [smallFile] } });

      // Verify readAsText was called
      expect(readAsTextMock).toHaveBeenCalledWith(smallFile);

      // Trigger onload
      act(() => {
        MockFileReader.instance.onload();
      });

      // Verify importModelJSON was called
      expect(mockProps.importModelJSON).toHaveBeenCalled();
    } finally {
      window.FileReader = originalFileReader;
    }
  });
});
