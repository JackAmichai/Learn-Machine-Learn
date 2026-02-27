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

describe('CodeExport Copy Functionality', () => {
    const defaultStructure = [2, 4, 1];
    const defaultHyperparams = { activation: 'relu', optimizer: 'adam' };

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should copy code to clipboard when copy button is clicked', async () => {
        // Mock clipboard API
        const writeTextMock = vi.fn().mockResolvedValue(undefined);
        Object.assign(navigator, {
            clipboard: {
                writeText: writeTextMock,
            },
        });

        render(<CodeExport structure={defaultStructure} hyperparams={defaultHyperparams} />);

        // Open the modal
        fireEvent.click(screen.getByText(/Show Code/i));

        // Find the copy button (using accessible name)
        const copyButton = screen.getByRole('button', { name: /Copy code to clipboard/i });

        // Click copy
        fireEvent.click(copyButton);

        // Verify clipboard writeText was called
        expect(writeTextMock).toHaveBeenCalled();

        // Check if button text changes to "Copied!"
        expect(await screen.findByText('✓ Copied!')).toBeInTheDocument();

        // Check aria-label update
        expect(copyButton).toHaveAttribute('aria-label', 'Copied code to clipboard');
    });
});
