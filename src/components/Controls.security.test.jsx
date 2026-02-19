import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Controls } from './Controls';

// Mock child components
vi.mock('./Tooltip', () => ({
  Tooltip: ({ word }) => <span>{word}</span>
}));

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

  it('blocks upload of files larger than 5MB', async () => {
    const readAsTextMock = vi.fn();

    class MockFileReader {
      constructor() {
        this.readAsText = readAsTextMock;
        this.onload = null;
      }
    }

    vi.stubGlobal('FileReader', MockFileReader);

    render(<Controls {...mockProps} />);

    // Find the file input
    const fileInput = screen.getByTestId('file-upload');

    // Create a large file (5MB + 1 byte)
    const largeFile = {
        name: 'large_model.json',
        size: 5 * 1024 * 1024 + 1,
        type: 'application/json'
    };

    // Simulate file selection
    fireEvent.change(fileInput, { target: { files: [largeFile] } });

    // Assert that readAsText was NOT called
    expect(readAsTextMock).not.toHaveBeenCalled();

    // Assert that importModelJSON was NOT called
    expect(mockProps.importModelJSON).not.toHaveBeenCalled();

    // Assert error message appears
    const statusMessage = await screen.findByRole('status');
    expect(statusMessage).toHaveTextContent(/too large/i);
    expect(statusMessage).toHaveClass('error');

    vi.unstubAllGlobals();
  });
});
