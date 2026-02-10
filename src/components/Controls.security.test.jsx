import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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
    importModelJSON: vi.fn(), // This is what we want to test
    layerFeatures: {},
    updateLayerFeatures: vi.fn()
  };

  // Mock FileReader
  const originalFileReader = window.FileReader;
  let fileReaderMock;

  beforeEach(() => {
    fileReaderMock = {
      readAsText: vi.fn(),
      result: null,
      onload: null,
    };

    window.FileReader = vi.fn(function() {
      return fileReaderMock;
    });
  });

  afterEach(() => {
    window.FileReader = originalFileReader;
    vi.clearAllMocks();
  });

  it('rejects file upload larger than 5MB', async () => {
    render(<Controls {...mockProps} />);

    const fileInput = screen.getByTestId('file-upload');

    // Create a large file (6MB)
    const file = new File(['x'.repeat(6 * 1024 * 1024)], 'large-model.json', { type: 'application/json' });

    // Simulate file selection
    fireEvent.change(fileInput, { target: { files: [file] } });

    // Expect importModelJSON NOT to be called
    expect(mockProps.importModelJSON).not.toHaveBeenCalled();

    // Expect error message
    // Note: The message might not appear immediately if setState is async,
    // but here check happens synchronously before FileReader.onload would be called if check existed.
    // However, the error message is set via state.

    await waitFor(() => {
        const status = screen.getByRole('status');
        expect(status).toHaveTextContent(/File size exceeds 5MB limit/i);
        expect(status).toHaveClass('error');
    });
  });

  it('allows file upload smaller than 5MB', async () => {
    render(<Controls {...mockProps} />);

    const fileInput = screen.getByTestId('file-upload');

    // Create a small file (1KB)
    const content = JSON.stringify({ valid: true });
    const file = new File([content], 'small-model.json', { type: 'application/json' });

    // Simulate file selection
    fireEvent.change(fileInput, { target: { files: [file] } });

    // Trigger onload manually since we mocked FileReader
    // Wait for readAsText to be called
    expect(fileReaderMock.readAsText).toHaveBeenCalledWith(file);

    // Simulate successful read
    fileReaderMock.result = content;
    if (fileReaderMock.onload) {
        fileReaderMock.onload();
    }

    // Expect importModelJSON to be called
    expect(mockProps.importModelJSON).toHaveBeenCalledWith(content);

    await waitFor(() => {
        const status = screen.getByRole('status');
        expect(status).toHaveTextContent(/Imported small-model.json/i);
        expect(status).toHaveClass('success');
    });
  });
});
