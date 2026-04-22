import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
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
