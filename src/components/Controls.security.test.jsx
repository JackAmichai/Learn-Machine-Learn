import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Controls } from './Controls';

// Mock Tooltip and CodeExport
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
    loss: 0,
    structure: [2, 3, 1],
    addLayer: vi.fn(),
    removeLayer: vi.fn(),
    updateNodeCount: vi.fn(),
    datasetParams: { type: 'spiral', noise: 0.1 },
    setDatasetParams: vi.fn(),
    mode: 'simple',
    setMode: vi.fn(),
    hyperparams: { learningRate: 0.1, activation: 'relu', optimizer: 'adam', batchSize: 32, gradientClip: 0 },
    updateHyperparams: vi.fn(),
    trainingMode: 'continuous',
    setTrainingMode: vi.fn(),
    slowDelay: 500,
    setSlowDelay: vi.fn(),
    stepState: {},
    runForwardPass: vi.fn(),
    runBackwardPass: vi.fn(),
    saveModelToLocal: vi.fn(),
    loadModelFromLocal: vi.fn(),
    exportModelJSON: vi.fn(),
    importModelJSON: vi.fn(),
    layerFeatures: {},
    updateLayerFeatures: vi.fn()
  };

  const originalFileReader = global.FileReader;
  const mockReadAsText = vi.fn();
  let readerInstance;

  beforeEach(() => {
    global.FileReader = vi.fn(function() {
      readerInstance = {
        readAsText: mockReadAsText,
        onload: null,
        result: null
      };
      return readerInstance;
    });
  });

  afterEach(() => {
    global.FileReader = originalFileReader;
    vi.clearAllMocks();
  });

  it('blocks file upload larger than 5MB', async () => {
    const { container } = render(<Controls {...mockProps} />);
    const fileInput = container.querySelector('input[type="file"]');

    // Create a large file (5MB + 1 byte)
    // We mock the 'size' property since jsdom might not calculate it from content accurately or efficienty
    const largeFile = new File([''], 'large_model.json', { type: 'application/json' });
    Object.defineProperty(largeFile, 'size', { value: 5 * 1024 * 1024 + 1 });

    fireEvent.change(fileInput, { target: { files: [largeFile] } });

    // Expect error message
    await waitFor(() => {
        expect(screen.getByText(/File exceeds 5MB limit/i)).toBeInTheDocument();
    });

    // importModelJSON should NOT be called
    expect(mockProps.importModelJSON).not.toHaveBeenCalled();
    // FileReader should NOT be instantiated (or at least readAsText not called)
    // Actually, checking readAsText not called is safer
    expect(mockReadAsText).not.toHaveBeenCalled();
  });

  it('allows file upload smaller than 5MB', async () => {
    const { container } = render(<Controls {...mockProps} />);
    const fileInput = container.querySelector('input[type="file"]');

    const validFile = new File(['{"valid": "json"}'], 'model.json', { type: 'application/json' });
    Object.defineProperty(validFile, 'size', { value: 1024 });

    fireEvent.change(fileInput, { target: { files: [validFile] } });

    // Wait for readAsText to be called
    await waitFor(() => expect(mockReadAsText).toHaveBeenCalled());

    // Trigger onload
    readerInstance.result = '{"valid": "json"}';
    readerInstance.onload();

    // Expect success message or import call
    await waitFor(() => {
        expect(mockProps.importModelJSON).toHaveBeenCalledWith('{"valid": "json"}');
        expect(screen.getByText(/Imported model.json/i)).toBeInTheDocument();
    });
  });
});
