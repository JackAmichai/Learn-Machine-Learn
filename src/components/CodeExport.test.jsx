import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { CodeExport } from './CodeExport';

describe('CodeExport', () => {
    const defaultStructure = [2, 4, 1];
    const defaultHyperparams = {
        activation: 'relu',
        optimizer: 'adam'
    };

    beforeEach(() => {
        // Mock clipboard
        Object.assign(navigator, {
            clipboard: {
                writeText: vi.fn().mockResolvedValue(),
            },
        });
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe('Security', () => {
        it('should sanitize activation function to prevent code injection', () => {
            const maliciousHyperparams = {
                activation: "relu', input_shape=(1,)); import os; os.system('echo hacked'); #",
                optimizer: 'adam'
            };

            render(<CodeExport structure={defaultStructure} hyperparams={maliciousHyperparams} />);

            fireEvent.click(screen.getByText(/Show Code/i));

            const preElement = screen.getByText(/import tensorflow/i).closest('pre');
            const codeContent = preElement.textContent;

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

    describe('UX', () => {
        it('should copy code to clipboard when copy button is clicked', async () => {
            render(<CodeExport structure={defaultStructure} hyperparams={defaultHyperparams} />);

            // Open modal
            fireEvent.click(screen.getByText(/Show Code/i));

            // Find copy button
            const copyBtn = screen.getByLabelText(/Copy code to clipboard/i);
            expect(copyBtn).toBeInTheDocument();

            // Click copy
            fireEvent.click(copyBtn);

            // Verify clipboard write
            expect(navigator.clipboard.writeText).toHaveBeenCalled();

            // Verify visual feedback (button text changes)
            await waitFor(() => {
                expect(screen.getByText('Copied!')).toBeInTheDocument();
            });
        });
    });
});
