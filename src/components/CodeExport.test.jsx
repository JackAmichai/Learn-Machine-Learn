import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CodeExport } from './CodeExport';

// Mock useToast
const mockPushToast = vi.fn();
vi.mock('../hooks/useToast', () => ({
    useToast: () => ({
        pushToast: mockPushToast
    })
}));

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

describe('CodeExport Functionality', () => {
    const defaultStructure = [2, 4, 1];
    const defaultHyperparams = {
        activation: 'relu',
        optimizer: 'adam'
    };

    it('should copy code to clipboard and show toast', async () => {
        const writeTextMock = vi.fn().mockResolvedValue(undefined);
        Object.assign(navigator, {
            clipboard: {
                writeText: writeTextMock
            }
        });

        render(<CodeExport structure={defaultStructure} hyperparams={defaultHyperparams} />);

        // Open modal
        fireEvent.click(screen.getByText(/Show Code/i));

        // Click copy button
        const copyBtn = screen.getByLabelText('Copy code to clipboard');
        fireEvent.click(copyBtn);

        expect(writeTextMock).toHaveBeenCalled();

        await waitFor(() => {
            expect(mockPushToast).toHaveBeenCalledWith(expect.objectContaining({
                type: 'success',
                title: 'Copied!'
            }));
        });
    });
});
