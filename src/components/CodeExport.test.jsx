import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { CodeExport } from './CodeExport';

describe('CodeExport', () => {
    const defaultStructure = [2, 4, 1];

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should copy code to clipboard when copy button is clicked', async () => {
        const mockWriteText = vi.fn().mockResolvedValue();
        Object.assign(navigator, {
            clipboard: {
                writeText: mockWriteText
            }
        });

        render(<CodeExport structure={defaultStructure} hyperparams={{ activation: 'relu', optimizer: 'adam' }} />);

        // Open the modal
        fireEvent.click(screen.getByText(/Show Code/i));

        // Click copy
        const copyButton = screen.getByRole('button', { name: /Copy code/i });
        fireEvent.click(copyButton);

        await waitFor(() => {
            expect(mockWriteText).toHaveBeenCalled();
            // The code should contain 'import tensorflow as tf' since it defaults to python
            expect(mockWriteText.mock.calls[0][0]).toContain('import tensorflow as tf');
        });
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
});
