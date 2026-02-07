import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Controls } from './Controls';

// Mock Tooltip - mimicking the real interactive nature (button)
vi.mock('./Tooltip', () => ({
  Tooltip: ({ word }) => <button data-testid={`tooltip-${word}`}>{word}</button>
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

  it('renders Hyperparameters without invalid nested interactive elements in labels', () => {
    render(<Controls {...mockProps} />);

    // Check Learning Rate
    const lrTooltip = screen.getByTestId('tooltip-Learning Rate');
    const lrLabel = lrTooltip.closest('label');
    expect(lrLabel).toBeNull();

    // Check Activation (might have multiples, check all)
    const activationTooltips = screen.getAllByTestId('tooltip-Activation');
    activationTooltips.forEach(t => expect(t.closest('label')).toBeNull());

    // Check Optimizer (might have multiples)
    const optimizerTooltips = screen.getAllByTestId('tooltip-Optimizer');
    optimizerTooltips.forEach(t => expect(t.closest('label')).toBeNull());

    // Check Batch Size
    const bsTooltip = screen.getByTestId('tooltip-Batch Size');
    expect(bsTooltip.closest('label')).toBeNull();
  });
});
