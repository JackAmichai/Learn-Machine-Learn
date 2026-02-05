import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Controls } from './Controls';

// Mocks
vi.mock('./Tooltip', () => ({
  Tooltip: ({ word }) => <span>{word}</span>
}));

vi.mock('./CodeExport', () => ({
  CodeExport: () => <div>CodeExport</div>
}));

// Mock props to render Controls without crashing
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
    importModelJSON: vi.fn(), // This is what we spy on
    layerFeatures: {
        1: { batchNorm: false, dropout: false, dropoutRate: 0.2 }
    },
    updateLayerFeatures: vi.fn()
};

describe('Controls Security', () => {
    it('prevents uploading files larger than 5MB', async () => {
        const importModelJSON = vi.fn();
        const { container } = render(
            <Controls
                {...mockProps}
                importModelJSON={importModelJSON}
            />
        );

        // Create a large file (> 5MB)
        // 5 * 1024 * 1024 = 5,242,880 bytes. We'll use 5.5MB.
        const size = 5.5 * 1024 * 1024;

        // In JSDOM/Vitest, creating a real "File" with large content might be slow or consume memory.
        // We can define 'size' property explicitly on a smaller blob if the code only checks .size
        // However, Controls.jsx likely calls readAsText.

        // Let's create a fake File object that has a large size property but empty content
        // This relies on the fact that we expect the code to check size *before* reading.
        // If it reads first, it might read empty content, but our test is checking for the size rejection.

        const file = new File([''], 'large_model.json', { type: 'application/json' });
        Object.defineProperty(file, 'size', { value: size });

        const input = container.querySelector('input[type="file"]');

        // Trigger the change event
        fireEvent.change(input, { target: { files: [file] } });

        // Wait for potential async operations
        await waitFor(() => {
             // Check if error message appeared
             // We look for part of the message we intend to implement
             expect(screen.queryByText(/File is too large/i)).toBeInTheDocument();
             // In the FAILURE case (before fix), this should be null, and importModelJSON should be called
        });

        // Since we are WRITING the test now, and we expect it to fail,
        // we write the assertions that represent the DESIRED state.

        // Assert importModelJSON was NOT called
        expect(importModelJSON).not.toHaveBeenCalled();

        // Assert error message IS present
        expect(screen.getByText(/File is too large/i)).toBeInTheDocument();
    });
});
