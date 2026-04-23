import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { CodeExport } from './CodeExport';
import { act } from '@testing-library/react';

describe('CodeExport Security', () => {
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

    it('should copy code to clipboard and change button text temporarily', async () => {
        const mockWriteText = vi.fn().mockResolvedValue();
        Object.assign(navigator, {
            clipboard: {
                writeText: mockWriteText
            }
        });

        vi.useFakeTimers();

        render(<CodeExport structure={defaultStructure} hyperparams={{ activation: 'relu', optimizer: 'adam' }} />);

        // Open the modal
        fireEvent.click(screen.getByText(/Show Code/i));

        const copyButton = screen.getByRole('button', { name: /copy code to clipboard/i });
        expect(copyButton.textContent).toBe('Copy Code');

        // Click copy
        await act(async () => {
            fireEvent.click(copyButton);
        });

        // Mock should be called with python code containing tensorflow import
        expect(mockWriteText).toHaveBeenCalledWith(expect.stringContaining('import tensorflow'));

        // Button text should change to "Copied!"
        expect(copyButton.textContent).toBe('Copied!');

        // Advance timers to trigger timeout
        await act(async () => {
            vi.advanceTimersByTime(2000);
        });

        // Button text should change back to "Copy Code"
        expect(copyButton.textContent).toBe('Copy Code');

        vi.useRealTimers();
    });
});
