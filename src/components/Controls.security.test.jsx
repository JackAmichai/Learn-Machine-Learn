import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Controls } from './Controls';

// Mock child components to isolate Controls logic
vi.mock('./Tooltip', () => ({
  Tooltip: ({ word }) => <span>{word}</span>
}));

vi.mock('./CodeExport', () => ({
  CodeExport: () => <div>CodeExport</div>
}));

describe('Controls Security Tests', () => {
  // Setup mock functions
  const mockImportModelJSON = vi.fn();
  const mockSetDatasetParams = vi.fn();
  const mockSetMode = vi.fn();
  const mockUpdateHyperparams = vi.fn();
  const mockSetTrainingMode = vi.fn();
  const mockSetSlowDelay = vi.fn();
  const mockRunForwardPass = vi.fn();
  const mockRunBackwardPass = vi.fn();
  const mockSaveModelToLocal = vi.fn();
  const mockLoadModelFromLocal = vi.fn();
  const mockExportModelJSON = vi.fn();
  const mockUpdateLayerFeatures = vi.fn();
  const mockSetIsPlaying = vi.fn();
  const mockAddLayer = vi.fn();
  const mockRemoveLayer = vi.fn();
  const mockUpdateNodeCount = vi.fn();

  const mockProps = {
    isPlaying: false,
    setIsPlaying: mockSetIsPlaying,
    epoch: 0,
    loss: 0.5,
    structure: [2, 4, 1],
    addLayer: mockAddLayer,
    removeLayer: mockRemoveLayer,
    updateNodeCount: mockUpdateNodeCount,
    datasetParams: { type: 'spiral', noise: 0 },
    setDatasetParams: mockSetDatasetParams,
    mode: 'simple',
    setMode: mockSetMode,
    hyperparams: {
        learningRate: 0.01,
        activation: 'relu',
        optimizer: 'adam',
        batchSize: 32,
        gradientClip: 0
    },
    updateHyperparams: mockUpdateHyperparams,
    trainingMode: 'continuous',
    setTrainingMode: mockSetTrainingMode,
    slowDelay: 500,
    setSlowDelay: mockSetSlowDelay,
    stepState: { status: 'idle' },
    runForwardPass: mockRunForwardPass,
    runBackwardPass: mockRunBackwardPass,
    saveModelToLocal: mockSaveModelToLocal,
    loadModelFromLocal: mockLoadModelFromLocal,
    exportModelJSON: mockExportModelJSON,
    importModelJSON: mockImportModelJSON,
    layerFeatures: {},
    updateLayerFeatures: mockUpdateLayerFeatures
  };

  const originalFileReader = window.FileReader;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    window.FileReader = originalFileReader;
  });

  it('blocks file upload larger than 5MB', async () => {
    render(<Controls {...mockProps} />);

    // Select the hidden file input
    const fileInput = screen.getByTestId('file-upload');
    expect(fileInput).toBeInTheDocument();

    // Create a mock file larger than 5MB
    // We can't easily create a real 6MB file in memory without crashing some environments,
    // but we can mock the size property which is what we check.
    const fileContent = '{"mock": "json"}';
    const largeFile = new File([fileContent], 'large_model.json', { type: 'application/json' });

    // Define size property explicitly to simulate a large file
    Object.defineProperty(largeFile, 'size', { value: 6 * 1024 * 1024 }); // 6MB

    // Mock FileReader to track usage
    const readAsTextSpy = vi.fn();
    window.FileReader = class {
        constructor() {
            this.onload = null;
        }
        readAsText(file) {
            readAsTextSpy(file);
            // Simulate onload if we wanted, but we expect it NOT to be called
            if (this.onload && file.size <= 5 * 1024 * 1024) {
               this.result = fileContent;
               this.onload();
            }
        }
    };

    fireEvent.change(fileInput, { target: { files: [largeFile] } });

    // 1. Verify FileReader.readAsText was NOT called (because size check prevented it)
    // Initially, this will FAIL (it will be called)
    expect(readAsTextSpy).not.toHaveBeenCalled();

    // 2. Verify error message appears
    // Initially, this will FAIL
    await waitFor(() => {
        expect(screen.getByText(/File too large/i)).toBeInTheDocument();
    });
  });
});
