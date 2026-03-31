import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { Controls } from './Controls';

// Mock Tooltip
vi.mock('./Tooltip', () => ({
  Tooltip: ({ word }) => <span>{word}</span>
}));

// Mock CodeExport
vi.mock('./CodeExport', () => ({
  CodeExport: () => <div>CodeExport</div>
}));

describe('Controls Component', () => {
  const mockProps = {
    isPlaying: false,
    setIsPlaying: vi.fn(),
    epoch: 0,
    loss: 0.5,
    structure: [2, 4, 1], // Input: 2, Hidden: 4 (Index 1), Output: 1
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

  it('renders layer controls with accessible labels', () => {
    render(<Controls {...mockProps} />);

    // Test for layer 1 controls
    const layerIndex = 1;

    // Check for "Remove layer" button
    const removeButton = screen.getByRole('button', { name: new RegExp(`remove layer ${layerIndex}`, 'i') });
    expect(removeButton).toBeInTheDocument();

    // Check for "Increase neurons" button
    const increaseButton = screen.getByRole('button', { name: new RegExp(`increase neurons in layer ${layerIndex}`, 'i') });
    expect(increaseButton).toBeInTheDocument();

    // Check for "Decrease neurons" button
    const decreaseButton = screen.getByRole('button', { name: new RegExp(`decrease neurons in layer ${layerIndex}`, 'i') });
    expect(decreaseButton).toBeInTheDocument();
  });

  describe('File Upload Security', () => {
    afterEach(() => {
      vi.unstubAllGlobals();
    });

    it('should reject files larger than 5MB to prevent client-side DoS', async () => {
      const user = userEvent.setup();

      // Mock FileReader to ensure it is not called
      const mockReadAsText = vi.fn();
      const mockFileReader = class {
        readAsText = mockReadAsText;
        onload = null;
      };
      vi.stubGlobal('FileReader', mockFileReader);

      render(<Controls {...mockProps} />);

      const fileInput = document.querySelector('input[type="file"]');
      expect(fileInput).not.toBeNull();

      // Create a mock file larger than 5MB
      const hugeFile = new File([''], 'huge-model.json', { type: 'application/json' });
      Object.defineProperty(hugeFile, 'size', { value: 6 * 1024 * 1024 }); // 6MB

      await user.upload(fileInput, hugeFile);

      // Verify FileReader was never used
      expect(mockReadAsText).not.toHaveBeenCalled();

      // Verify the error message is displayed
      const errorMessage = screen.getByText('File size exceeds 5MB limit.');
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveClass('error');
    });
  });
});
