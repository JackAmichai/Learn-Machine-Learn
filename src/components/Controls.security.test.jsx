import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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

describe('Controls Security Tests', () => {
    let originalFileReader;
    let mockFileReaderInstances = [];

    beforeEach(() => {
        originalFileReader = window.FileReader;
        mockFileReaderInstances = [];

        // Mock FileReader as a class
        window.FileReader = class {
            constructor() {
                this.readAsText = vi.fn();
                this.result = '';
                this.onload = null;
                mockFileReaderInstances.push(this);
            }
        };
    });

    afterEach(() => {
        window.FileReader = originalFileReader;
        vi.restoreAllMocks();
    });

    const defaultProps = {
        structure: [2, 4, 1],
        hyperparams: {
            learningRate: 0.01,
            activation: 'relu',
            optimizer: 'adam',
            batchSize: 32,
            gradientClip: 0
        },
        loss: 0,
        datasetParams: { type: 'spiral', noise: 0 },
        layerFeatures: {},
        importModelJSON: vi.fn(),
        updateHyperparams: vi.fn(),
        setDatasetParams: vi.fn(),
        setMode: vi.fn(),
        setTrainingMode: vi.fn(),
        setSlowDelay: vi.fn(),
        stepState: { status: 'idle' }
    };

    it('should reject files larger than 5MB', async () => {
        render(<Controls {...defaultProps} />);

        const input = document.querySelector('input[type="file"]');

        // Create a large file object (mocked properties)
        const hugeFile = {
            name: 'huge.json',
            size: 5 * 1024 * 1024 + 1, // 5MB + 1 byte
            type: 'application/json'
        };

        fireEvent.change(input, { target: { files: [hugeFile] } });

        // Expect error message
        await waitFor(() => {
            const error = screen.getByRole('status');
            expect(error).toHaveTextContent(/File too large/i);
            expect(error).toHaveClass('error');
        });

        // FileReader should NOT be instantiated
        expect(mockFileReaderInstances.length).toBe(0);
    });

    it('should accept files smaller than 5MB', async () => {
        render(<Controls {...defaultProps} />);

        const validFile = {
            name: 'valid.json',
            size: 4 * 1024 * 1024, // 4MB
            type: 'application/json'
        };

        const input = document.querySelector('input[type="file"]');
        fireEvent.change(input, { target: { files: [validFile] } });

        // FileReader SHOULD be instantiated
        await waitFor(() => {
            expect(mockFileReaderInstances.length).toBe(1);
        });
    });
});
