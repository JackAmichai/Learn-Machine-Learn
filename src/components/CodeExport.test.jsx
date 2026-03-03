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

    it('should copy code to clipboard and show feedback', async () => {
        // Mock navigator.clipboard
        const mockWriteText = vi.fn().mockResolvedValue(undefined);
        Object.assign(navigator, {
            clipboard: {
                writeText: mockWriteText,
            },
        });

        render(<CodeExport structure={defaultStructure} hyperparams={{ activation: 'relu', optimizer: 'adam' }} />);

        // Open modal
        fireEvent.click(screen.getByText(/Show Code/i));

        // Find copy button
        const copyButton = screen.getByRole('button', { name: /Copy code to clipboard/i });
        expect(copyButton.textContent).toBe('Copy');

        // Click copy button
        await act(async () => {
            fireEvent.click(copyButton);
        });

        // Assert clipboard was called
        expect(mockWriteText).toHaveBeenCalled();
        const codePassedToClipboard = mockWriteText.mock.calls[0][0];
        expect(codePassedToClipboard).toContain('import tensorflow as tf');

        // Verify state update occurred
        expect(copyButton.textContent).toBe('Copied!');
    });
});
