import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { CodeExport } from './CodeExport';
import * as toastHook from '../hooks/useToast';

// Mock useToast hook
const pushToastSpy = vi.fn();
vi.spyOn(toastHook, 'useToast').mockReturnValue({ pushToast: pushToastSpy });

describe('CodeExport', () => {
    const defaultStructure = [2, 4, 1];

    beforeEach(() => {
        pushToastSpy.mockClear();
        // Mock clipboard API
        Object.assign(navigator, {
            clipboard: {
                writeText: vi.fn().mockResolvedValue(undefined),
            },
        });
    });

    afterEach(() => {
        vi.restoreAllMocks();
        // Re-mock useToast because we want it persistent across tests in this file
        vi.spyOn(toastHook, 'useToast').mockReturnValue({ pushToast: pushToastSpy });
    });

    describe('Security', () => {
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

    describe('UX', () => {
        const defaultHyperparams = {
            activation: 'relu',
            optimizer: 'adam'
        };

        it('should copy code to clipboard and show success toast', async () => {
            render(<CodeExport structure={defaultStructure} hyperparams={defaultHyperparams} />);

            // Open modal
            fireEvent.click(screen.getByText(/Show Code/i));

            // Click copy
            fireEvent.click(screen.getByLabelText('Copy code to clipboard'));

            await waitFor(() => {
                expect(navigator.clipboard.writeText).toHaveBeenCalled();
                expect(pushToastSpy).toHaveBeenCalledWith(expect.objectContaining({
                    type: 'success',
                    title: 'Copied!'
                }));
            });
        });

        it('should show error toast on copy failure', async () => {
            // Mock failure
            navigator.clipboard.writeText.mockRejectedValue(new Error('Copy failed'));

            render(<CodeExport structure={defaultStructure} hyperparams={defaultHyperparams} />);

            fireEvent.click(screen.getByText(/Show Code/i));
            fireEvent.click(screen.getByLabelText('Copy code to clipboard'));

            await waitFor(() => {
                expect(navigator.clipboard.writeText).toHaveBeenCalled();
                expect(pushToastSpy).toHaveBeenCalledWith(expect.objectContaining({
                    type: 'error',
                    title: 'Copy Failed'
                }));
            });
        });
    });
});
