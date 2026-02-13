import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MathModal } from './MathModal';

describe('MathModal Accessibility', () => {
    // "Loss" topic contains interactive formulas (MSE, etc.)
    const topic = "Loss";

    it('renders formula parts as interactive buttons', () => {
        render(<MathModal topic={topic} onClose={() => {}} />);

        // Find the "Mean Squared Error" section
        // The title of the formula is "Mean Squared Error:" in a span with class "formula-name"
        const formulaName = screen.getByText('Mean Squared Error:', { selector: '.formula-name' });
        const playground = formulaName.closest('.formula-playground');

        // Find 'y' symbol within this playground
        // We look for elements with class 'formula-part' containing text 'y'
        const ySymbol = within(playground).getByText('y', { selector: '.formula-part' });

        expect(ySymbol).toHaveAttribute('role', 'button');
        expect(ySymbol).toHaveAttribute('tabIndex', '0');
    });

    it('shows tooltip when focusing a formula part', () => {
        render(<MathModal topic={topic} onClose={() => {}} />);

        const formulaName = screen.getByText('Mean Squared Error:', { selector: '.formula-name' });
        const playground = formulaName.closest('.formula-playground');
        const ySymbol = within(playground).getByText('y', { selector: '.formula-part' });

        // Initial state: no tooltip
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

        // Focus the part
        fireEvent.focus(ySymbol);

        // Tooltip should appear inside the symbol span
        // Note: multiple tooltips might appear if other formulas share the same variable key (shared state in MathModal).
        // We scope to the specific symbol we focused.
        const tooltip = within(ySymbol).getByRole('tooltip');
        expect(tooltip).toBeInTheDocument();
        expect(tooltip).toHaveTextContent('True Value');

        // Check aria-describedby
        expect(ySymbol).toHaveAttribute('aria-describedby', tooltip.id);
        expect(tooltip.id).toMatch(/-tooltip-/); // Verify ID format

        // Blur
        fireEvent.blur(ySymbol);
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });

    it('highlights formula part when focusing the corresponding slider', () => {
        render(<MathModal topic={topic} onClose={() => {}} />);

        const formulaName = screen.getByText('Mean Squared Error:', { selector: '.formula-name' });
        const playground = formulaName.closest('.formula-playground');

        // Find inputs within this playground
        // Since we don't have labeled-by, get slider inputs
        const inputs = within(playground).getAllByRole('slider');
        const yInput = inputs[0]; // First variable for MSE is usually y_true (y)

        const ySymbol = within(playground).getByText('y', { selector: '.formula-part' });

        // Initial: symbol not active
        expect(ySymbol).not.toHaveClass('active');

        // Focus input
        fireEvent.focus(yInput);

        // Symbol should be active
        expect(ySymbol).toHaveClass('active');

        // Blur input
        fireEvent.blur(yInput);
        expect(ySymbol).not.toHaveClass('active');
    });
});
