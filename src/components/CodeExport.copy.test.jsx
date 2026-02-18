import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { CodeExport } from './CodeExport';

describe('CodeExport Copy Functionality', () => {
    const defaultStructure = [2, 4, 1];
    const defaultHyperparams = {
        activation: 'relu',
        optimizer: 'adam'
    };

    // Mock clipboard API
    const writeTextMock = vi.fn();
    Object.assign(navigator, {
        clipboard: {
            writeText: writeTextMock,
        },
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should copy code to clipboard and show feedback', async () => {
        render(<CodeExport structure={defaultStructure} hyperparams={defaultHyperparams} />);

        // Open the modal
        fireEvent.click(screen.getByText(/Show Code/i));

        // Find the copy button
        const copyButton = screen.getByLabelText(/Copy code to clipboard/i);
        expect(copyButton).toBeInTheDocument();

        // Click the copy button
        fireEvent.click(copyButton);

        // Verify clipboard write
        expect(writeTextMock).toHaveBeenCalledTimes(1);
        // We expect some code string, we can check if it contains key parts
        expect(writeTextMock.mock.calls[0][0]).toContain('import tensorflow as tf');

        // Verify feedback
        expect(await screen.findByText(/Copied!/i)).toBeInTheDocument();

        // Verify feedback disappears (optional, but good for completeness)
        // Note: This might require fake timers if we want to test the timeout strictly,
        // but checking it initially changes is enough for the "Copy" feature verification.
    });
});
