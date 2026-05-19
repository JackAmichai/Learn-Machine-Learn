import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CodeExport } from './CodeExport';

describe('CodeExport Security', () => {
    const defaultStructure = [2, 4, 1];

    it('should sanitize activation function to prevent code injection', () => {
        const maliciousHyperparams = {
            activation: "relu', input_shape=(1,)); import os; os.system('echo hacked'); #",
            optimizer: 'adam'
        };

        render(<CodeExport structure={defaultStructure} hyperparams={maliciousHyperparams} />);

        // Open the modal
        fireEvent.click(screen.getByText(/Show Code/i));

        // Check Python code
        const preElement = screen.getByText(/import tensorflow/i).closest('pre');
        const codeContent = preElement.textContent;

        // The malicious payload should NOT be present in its executable form
        expect(codeContent).not.toContain("import os; os.system('echo hacked')");
    });

    it('should sanitize optimizer to prevent code injection', () => {
        const maliciousHyperparams = {
            activation: 'relu',
            optimizer: "adam', metrics=['accuracy']); import os; os.system('echo hacked'); #"
        };

        render(<CodeExport structure={defaultStructure} hyperparams={maliciousHyperparams} />);

        fireEvent.click(screen.getByText(/Show Code/i));

        const preElement = screen.getByText(/import tensorflow/i).closest('pre');
        const codeContent = preElement.textContent;

        expect(codeContent).not.toContain("import os; os.system('echo hacked')");
    });
});

describe('CodeExport UX', () => {
    const defaultStructure = [2, 4, 1];
    const defaultHyperparams = {
        activation: 'relu',
        optimizer: 'adam'
    };

    it('should copy code to clipboard when copy button is clicked', async () => {
        // Mock clipboard API
        Object.assign(navigator, {
            clipboard: {
                writeText: vi.fn().mockImplementation(() => Promise.resolve())
            }
        });

        render(<CodeExport structure={defaultStructure} hyperparams={defaultHyperparams} />);

        // Open the modal
        fireEvent.click(screen.getByText(/Show Code/i));

        const copyButton = screen.getByRole('button', { name: /Copy code to clipboard/i });
        expect(copyButton.textContent).toBe('Copy');

        // Click copy button inside act to handle state update
        await act(async () => {
            fireEvent.click(copyButton);
        });

        // Ensure clipboard was called
        expect(navigator.clipboard.writeText).toHaveBeenCalled();
        const codePassed = navigator.clipboard.writeText.mock.calls[0][0];
        expect(codePassed).toContain('import tensorflow as tf'); // Python default code

        // Ensure UI updated to 'Copied!'
        expect(copyButton.textContent).toBe('Copied!');
    });
});
