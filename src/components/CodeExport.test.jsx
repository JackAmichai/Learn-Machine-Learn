import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { CodeExport } from './CodeExport';

describe('CodeExport', () => {
    const defaultStructure = [2, 4, 1];

    afterEach(() => {
        vi.restoreAllMocks();
    });

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

    it('should copy code to clipboard and show feedback', async () => {
        const mockWriteText = vi.fn();
        Object.assign(navigator, {
            clipboard: {
                writeText: mockWriteText
            }
        });

        const hyperparams = {
            activation: 'relu',
            optimizer: 'adam'
        };

        render(<CodeExport structure={defaultStructure} hyperparams={hyperparams} />);

        // Open modal
        fireEvent.click(screen.getByText(/Show Code/i));

        // Find and click copy button
        const copyButton = screen.getByText('Copy');
        expect(copyButton).toBeInTheDocument();

        await act(async () => {
            fireEvent.click(copyButton);
        });

        // Verify clipboard was called
        expect(mockWriteText).toHaveBeenCalled();
        const copiedText = mockWriteText.mock.calls[0][0];
        expect(copiedText).toContain('import tensorflow as tf');

        // Verify button text changed to Copied!
        expect(copyButton.textContent).toBe('Copied!');
    });
});
