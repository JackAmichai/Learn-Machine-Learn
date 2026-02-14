import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Controls } from './Controls';

// Mock Tooltip and CodeExport to avoid rendering complexity
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
    layerFeatures: {},
    updateLayerFeatures: vi.fn()
  };

  let originalFileReader;
  let readAsTextMock;

  beforeEach(() => {
    originalFileReader = window.FileReader;
    readAsTextMock = vi.fn();

    window.FileReader = class {
      constructor() {
        this.readAsText = readAsTextMock;
        this.onload = null;
      }
    };
  });

  afterEach(() => {
    window.FileReader = originalFileReader;
    vi.clearAllMocks();
  });

  it('blocks file uploads larger than 5MB', async () => {
    const { container } = render(<Controls {...mockProps} />);
    const fileInput = container.querySelector('input[type="file"]');
    expect(fileInput).not.toBeNull();

    // Create a large fake file (5MB + 1 byte)
    // Note: Creating a string that big might be slow in jsdom/test, but let's try.
    // Alternatively we can just mock the size property if the component only checks .size
    // But File constructor takes content.
    // Let's rely on File property mocking if needed, but 'x'.repeat(5MB) is only 5MB RAM, should be fine.
    const largeFile = new File(['x'.repeat(5 * 1024 * 1024 + 1)], 'large_model.json', { type: 'application/json' });

    // Trigger file selection
    fireEvent.change(fileInput, { target: { files: [largeFile] } });

    // Expect readAsText NOT to be called
    expect(readAsTextMock).not.toHaveBeenCalled();

    // Expect error message
    await waitFor(() => {
        // Use a function to find text because it might be part of a sentence
        const errorMsg = screen.getByText((content) => content.includes('File too large'));
        expect(errorMsg).toBeInTheDocument();
    });
  });

  it('allows file uploads smaller than 5MB', async () => {
    const { container } = render(<Controls {...mockProps} />);
    const fileInput = container.querySelector('input[type="file"]');

    const smallFile = new File(['{}'], 'small_model.json', { type: 'application/json' });

    fireEvent.change(fileInput, { target: { files: [smallFile] } });

    expect(readAsTextMock).toHaveBeenCalledWith(smallFile);
  });
});
