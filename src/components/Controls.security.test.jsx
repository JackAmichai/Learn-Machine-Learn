import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { Controls } from './Controls';

// Mock Tooltip and CodeExport
vi.mock('./Tooltip', () => ({
  Tooltip: ({ word }) => <span>{word}</span>
}));
vi.mock('./CodeExport', () => ({
  CodeExport: () => <div>CodeExport</div>
}));

describe('Controls Security Tests', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

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

  it('blocks files larger than 5MB to prevent DoS', async () => {
    const readAsTextMock = vi.fn();

    // Class-based mock for FileReader as per memory guidelines
    class MockFileReader {
      readAsText = readAsTextMock;
      onload = null;
    }
    vi.stubGlobal('FileReader', MockFileReader);

    const { container } = render(<Controls {...mockProps} />);

    // Find the hidden file input
    const fileInput = container.querySelector('input[type="file"]');

    // Create a large file (6MB)
    const largeFile = new File([''], 'large.json', { type: 'application/json' });
    Object.defineProperty(largeFile, 'size', { value: 6 * 1024 * 1024 });

    fireEvent.change(fileInput, { target: { files: [largeFile] } });

    // Expect importModelJSON NOT to be called
    expect(mockProps.importModelJSON).not.toHaveBeenCalled();

    // Expect readAsText NOT to be called
    expect(readAsTextMock).not.toHaveBeenCalled();

    // Expect error message
    await waitFor(() => {
        const status = screen.getByRole('status');
        expect(status).toHaveTextContent(/File too large/i);
        expect(status).toHaveClass('error');
    });
  });

  it('allows files smaller than 5MB', async () => {
    const readAsTextMock = vi.fn();
    class MockFileReader {
        constructor() {
            this.readAsText = readAsTextMock;
            this.onload = null;
        }
    }
    vi.stubGlobal('FileReader', MockFileReader);

    const { container } = render(<Controls {...mockProps} />);

    const fileInput = container.querySelector('input[type="file"]');
    const smallFile = new File(['{}'], 'small.json', { type: 'application/json' });
    Object.defineProperty(smallFile, 'size', { value: 1024 });

    fireEvent.change(fileInput, { target: { files: [smallFile] } });

    // readAsText IS called
    expect(readAsTextMock).toHaveBeenCalledWith(smallFile);
  });
});
