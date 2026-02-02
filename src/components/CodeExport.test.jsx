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

describe('CodeExport Accessibility', () => {
    const defaultStructure = [2, 4, 1];
    const defaultHyperparams = { activation: 'relu', optimizer: 'adam' };

    it('should have accessible modal attributes', () => {
        render(<CodeExport structure={defaultStructure} hyperparams={defaultHyperparams} />);

        // Open the modal
        fireEvent.click(screen.getByText(/Show Code/i));

        // Check dialog role and attributes
        const dialog = screen.getByRole('dialog');
        expect(dialog).toHaveAttribute('aria-modal', 'true');
        expect(dialog).toHaveAttribute('aria-labelledby', 'export-modal-title');

        // Check title id
        const title = screen.getByRole('heading', { level: 3 });
        expect(title).toHaveAttribute('id', 'export-modal-title');

        // Check close button aria-label
        const closeBtn = screen.getByLabelText('Close');
        expect(closeBtn).toBeInTheDocument();

        // Check tab list
        const tabList = screen.getByRole('tablist');
        expect(tabList).toHaveAttribute('aria-label', 'Code language selection');

        // Check tabs
        const pythonTab = screen.getByRole('tab', { name: /python/i });
        const jsTab = screen.getByRole('tab', { name: /javascript/i });

        expect(pythonTab).toHaveAttribute('aria-selected', 'true'); // Default selected
        expect(jsTab).toHaveAttribute('aria-selected', 'false');

        // Check tabpanel
        const tabPanel = screen.getByRole('tabpanel');
        expect(tabPanel).toBeInTheDocument();
        expect(tabPanel).toHaveAttribute('aria-labelledby', 'tab-python');
    });

    it('should update tab accessibility states when switched', () => {
        render(<CodeExport structure={defaultStructure} hyperparams={defaultHyperparams} />);

        // Open the modal
        fireEvent.click(screen.getByText(/Show Code/i));

        const pythonTab = screen.getByRole('tab', { name: /python/i });
        const jsTab = screen.getByRole('tab', { name: /javascript/i });

        // Switch to JS
        fireEvent.click(jsTab);

        expect(pythonTab).toHaveAttribute('aria-selected', 'false');
        expect(jsTab).toHaveAttribute('aria-selected', 'true');

        const tabPanel = screen.getByRole('tabpanel');
        expect(tabPanel).toHaveAttribute('aria-labelledby', 'tab-js');
    });
});
