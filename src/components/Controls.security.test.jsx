import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
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
    layerFeatures: {},
    updateLayerFeatures: vi.fn()
  };

  it('rejects files larger than 5MB', () => {
    render(<Controls {...mockProps} />);

    const fileInput = screen.getByTestId('file-upload');

    // Create a mock file larger than 5MB
    const file = new File(['a'], 'large_model.json', { type: 'application/json' });
    Object.defineProperty(file, 'size', { value: 5 * 1024 * 1024 + 1 });

    fireEvent.change(fileInput, { target: { files: [file] } });

    // Verify importModelJSON was NOT called
    expect(mockProps.importModelJSON).not.toHaveBeenCalled();

    // Verify error message appears
    // The status message is displayed in a div with role="status"
    const statusDiv = screen.getByRole('status');
    expect(statusDiv).toHaveTextContent(/File too large/i);
  });
});
