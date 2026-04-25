import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
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

describe('CodeExport Functionality', () => {
    const defaultStructure = [2, 4, 1];

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should copy code to clipboard and show feedback', async () => {
        const hyperparams = { activation: 'relu', optimizer: 'adam' };

        // Mock clipboard
        Object.assign(navigator, {
            clipboard: {
                writeText: vi.fn(),
            },
        });

        render(<CodeExport structure={defaultStructure} hyperparams={hyperparams} />);

        // Open modal
        fireEvent.click(screen.getByText(/Show Code/i));

        // Find the copy button
        const copyBtn = screen.getByRole('button', { name: /Copy code to clipboard/i });
        expect(copyBtn).toHaveTextContent('Copy');

        // Use fake timers to skip waiting
        vi.useFakeTimers();

        // Click copy
        await act(async () => {
            fireEvent.click(copyBtn);
        });

        expect(navigator.clipboard.writeText).toHaveBeenCalled();
        expect(copyBtn).toHaveTextContent('Copied!');

        // Fast forward timers
        await act(async () => {
            vi.runAllTimers();
        });

        // Verify it reverted
        expect(copyBtn).toHaveTextContent('Copy');

        vi.useRealTimers();
    });
});
