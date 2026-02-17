import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
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
    layerFeatures: {},
    updateLayerFeatures: vi.fn()
  };

  const originalFileReader = window.FileReader;
  let mockFileReader;

  beforeEach(() => {
    vi.clearAllMocks();

    // Setup FileReader mock
    mockFileReader = {
      readAsText: vi.fn(),
      result: '',
      onload: null,
    };

    // Mock the constructor
    // Use a regular function so it can be called with 'new'
    window.FileReader = vi.fn(function() {
      return mockFileReader;
    });
  });

  afterEach(() => {
    window.FileReader = originalFileReader;
  });

  it('blocks file uploads larger than 5MB', async () => {
    render(<Controls {...mockProps} />);

    // Find the hidden file input
    const fileInput = document.querySelector('input[type="file"]');

    // Mock a large file (5MB + 1 byte)
    // We use a plain object that mimics a File for the properties we care about
    const largeFile = {
      name: 'large-model.json',
      size: 5 * 1024 * 1024 + 1,
      type: 'application/json'
    };

    // Trigger change event
    fireEvent.change(fileInput, { target: { files: [largeFile] } });

    // Expect error message about file size
    await waitFor(() => {
      const statusMessage = screen.queryByText(/File is too large/i);
      expect(statusMessage).toBeInTheDocument();
    });

    // Ensure FileReader was NOT called
    expect(mockFileReader.readAsText).not.toHaveBeenCalled();
    expect(mockProps.importModelJSON).not.toHaveBeenCalled();
  });

  it('allows file uploads smaller than 5MB', async () => {
    render(<Controls {...mockProps} />);

    const fileInput = document.querySelector('input[type="file"]');
    const smallFile = {
      name: 'small-model.json',
      size: 1024, // 1KB
      type: 'application/json'
    };

    // Trigger change event
    fireEvent.change(fileInput, { target: { files: [smallFile] } });

    // Wait for readAsText to be called
    await waitFor(() => {
        expect(mockFileReader.readAsText).toHaveBeenCalledWith(smallFile);
    });

    // Simulate successful read
    mockFileReader.result = '{"model": "data"}';

    // Trigger the onload callback which updates state
    act(() => {
      mockFileReader.onload();
    });

    await waitFor(() => {
        expect(screen.getByText(/Imported small-model.json/i)).toBeInTheDocument();
    });

    expect(mockProps.importModelJSON).toHaveBeenCalledWith('{"model": "data"}');
  });
});
