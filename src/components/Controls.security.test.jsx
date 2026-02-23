import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Controls } from './Controls';
import React from 'react';

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

  let originalFileReader;

  beforeEach(() => {
    originalFileReader = window.FileReader;
    window.FileReader = class {
      constructor() {
        this.readAsText = vi.fn();
        this.onload = null;
      }
    };
  });

  afterEach(() => {
    window.FileReader = originalFileReader;
    vi.clearAllMocks();
  });

  it('prevents upload of files larger than 5MB', async () => {
    const { container } = render(<Controls {...mockProps} />);
    const fileInput = container.querySelector('input[type="file"]');

    // Create a large file (5MB + 1 byte)
    const file = new File([''], 'large.json', { type: 'application/json' });
    Object.defineProperty(file, 'size', { value: 5 * 1024 * 1024 + 1 });

    fireEvent.change(fileInput, { target: { files: [file] } });

    // Expect error message
    await waitFor(() => {
        const statusElement = screen.getByRole('status');
        expect(statusElement).toHaveTextContent(/File too large/i);
    });

    // Verify import was not called
    expect(mockProps.importModelJSON).not.toHaveBeenCalled();
  });
});
