import { render, screen } from '@testing-library/react';
import { Controls } from './Controls';
import { describe, it, expect, vi } from 'vitest';

// Mock Tooltip since it might be complex
vi.mock('./Tooltip', () => ({
    Tooltip: ({ word }) => <span>{word}</span>
}));

// Mock CodeExport
vi.mock('./CodeExport', () => ({
    CodeExport: () => <div>CodeExport</div>
}));

describe('Controls Component Accessibility', () => {
    const defaultProps = {
        isPlaying: false,
        setIsPlaying: vi.fn(),
        epoch: 0,
        loss: 0.1,
        // Structure: Input (2), Hidden (4), Output (1)
        structure: [2, 4, 1],
        addLayer: vi.fn(),
        removeLayer: vi.fn(),
        updateNodeCount: vi.fn(),
        datasetParams: { type: 'xor', noise: 0 },
        setDatasetParams: vi.fn(),
        mode: 'simple',
        setMode: vi.fn(),
        hyperparams: { learningRate: 0.01, activation: 'relu', optimizer: 'adam', gradientClip: 1 },
        updateHyperparams: vi.fn(),
        trainingMode: 'continuous',
        setTrainingMode: vi.fn(),
        slowDelay: 500,
        setSlowDelay: vi.fn(),
        stepState: { busy: false, phase: 'forward' },
        runForwardPass: vi.fn(),
        runBackwardPass: vi.fn(),
        saveModelToLocal: vi.fn(),
        loadModelFromLocal: vi.fn(),
        exportModelJSON: vi.fn(),
        importModelJSON: vi.fn(),
        layerFeatures: { 1: { batchNorm: false, dropout: false, dropoutRate: 0.2 } },
        updateLayerFeatures: vi.fn()
    };

    it('buttons have accessible names', () => {
        render(<Controls {...defaultProps} />);

        // The hidden layer is at index 1.

        // These assertions are expected to fail before the fix
        expect(screen.getByRole('button', { name: /Decrease neurons in layer 1/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Increase neurons in layer 1/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Remove hidden layer 1/i })).toBeInTheDocument();
    });
});
