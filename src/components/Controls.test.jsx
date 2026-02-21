import { render, screen } from '@testing-library/react';
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

  it('renders task mode buttons with correct aria-pressed state', () => {
    const props = { ...mockProps, mode: 'simple' };
    const { rerender } = render(<Controls {...props} />);

    const simpleBtn = screen.getByRole('button', { name: /simple 2d/i });
    const visionBtn = screen.getByRole('button', { name: /vision/i });

    expect(simpleBtn).toHaveAttribute('aria-pressed', 'true');
    expect(visionBtn).toHaveAttribute('aria-pressed', 'false');

    // Update props to vision mode
    rerender(<Controls {...props} mode="vision" />);

    expect(simpleBtn).toHaveAttribute('aria-pressed', 'false');
    expect(visionBtn).toHaveAttribute('aria-pressed', 'true');
  });
});
