import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
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
    const defaultHyperparams = { activation: 'relu', optimizer: 'adam' };

    // Mock navigator.clipboard
    const writeTextMock = vi.fn();
    Object.assign(navigator, {
        clipboard: {
            writeText: writeTextMock
        }
    });

    afterEach(() => {
        writeTextMock.mockClear();
    });

    it('should copy code to clipboard and show feedback', async () => {
        render(<CodeExport structure={defaultStructure} hyperparams={defaultHyperparams} />);

        // Open modal
        fireEvent.click(screen.getByText(/Show Code/i));

        // Find copy button
        const copyBtn = screen.getByLabelText(/Copy code to clipboard/i);
        expect(copyBtn).toBeInTheDocument();
        expect(copyBtn).toHaveTextContent(/Copy/i);

        // Click copy
        fireEvent.click(copyBtn);

        // Verify clipboard call
        expect(writeTextMock).toHaveBeenCalledTimes(1);
        const copiedText = writeTextMock.mock.calls[0][0];
        expect(copiedText).toContain('import tensorflow as tf');

        // Verify visual feedback
        expect(await screen.findByText(/✅ Copied!/i)).toBeInTheDocument();
    });
});
