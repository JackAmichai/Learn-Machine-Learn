import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Tooltip } from './Tooltip';
import React from 'react';

// Mock the hook
vi.mock('../hooks/useMath', () => ({
    useMath: () => ({
        openMath: vi.fn(),
    }),
}));

describe('Tooltip', () => {
    it('opens on focus', async () => {
        render(<Tooltip word="Loss" />);
        const trigger = screen.getByText('Loss', { selector: '.tooltip-word' });

        fireEvent.focus(trigger);

        expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });

    it('should stay open when focus moves to button inside', async () => {
        render(<Tooltip word="Loss" />);
        const trigger = screen.getByText('Loss', { selector: '.tooltip-word' });

        // Open tooltip
        fireEvent.focus(trigger);
        expect(screen.getByRole('tooltip')).toBeInTheDocument();

        // Find the button inside. Using getByText avoids role ambiguity with the container
        const mathBtn = screen.getByText(/See Math Behind It/i);

        // Simulate tabbing: Blur the trigger, setting relatedTarget to the button inside
        fireEvent.blur(trigger, { relatedTarget: mathBtn });

        // The tooltip should still be in the document
        // This is expected to FAIL currently because the code closes it on blur
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
        expect(mathBtn).toBeInTheDocument();
    });

    it('should close when focus moves outside', async () => {
        render(<Tooltip word="Loss" />);
        const trigger = screen.getByText('Loss', { selector: '.tooltip-word' });

        // Open tooltip
        fireEvent.focus(trigger);
        expect(screen.getByRole('tooltip')).toBeInTheDocument();

        // Simulate tabbing away to body or other element
        fireEvent.blur(trigger, { relatedTarget: document.body });

        // The tooltip should be gone
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });

    it('should close gracefully when blurring to browser window (null relatedTarget)', () => {
        render(<Tooltip word="Loss" />);
        const trigger = screen.getByText('Loss', { selector: '.tooltip-word' });

        fireEvent.focus(trigger);
        expect(screen.getByRole('tooltip')).toBeInTheDocument();

        // Simulate tabbing out of window
        fireEvent.blur(trigger, { relatedTarget: null });

        // Should not crash and should close tooltip
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });
});
