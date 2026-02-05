import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
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

    beforeEach(() => {
        vi.clearAllMocks();
        // Mock navigator.clipboard
        Object.assign(navigator, {
            clipboard: {
                writeText: vi.fn().mockResolvedValue(undefined),
            },
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

    it('should copy code to clipboard when copy button is clicked', async () => {
        const hyperparams = { activation: 'relu', optimizer: 'adam' };
        render(<CodeExport structure={defaultStructure} hyperparams={hyperparams} />);

        // Open modal
        fireEvent.click(screen.getByText(/Show Code/i));

        // Click copy button
        const copyBtn = screen.getByText('Copy Code');
        fireEvent.click(copyBtn);

        // Verify writeText was called
        expect(navigator.clipboard.writeText).toHaveBeenCalled();

        // Verify toast was shown
        await waitFor(() => {
            expect(mockPushToast).toHaveBeenCalledWith(expect.objectContaining({
                type: 'success',
                message: expect.stringContaining('copied')
            }));
        });
    });
});
