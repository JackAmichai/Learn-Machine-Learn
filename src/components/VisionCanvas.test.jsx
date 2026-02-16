import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { VisionCanvas } from './VisionCanvas';

describe('VisionCanvas', () => {
    beforeEach(() => {
        // Mock getContext
        HTMLCanvasElement.prototype.getContext = vi.fn(() => ({
            clearRect: vi.fn(),
            fillRect: vi.fn(),
            beginPath: vi.fn(),
            moveTo: vi.fn(),
            lineTo: vi.fn(),
            stroke: vi.fn(),
        }));
    });

    it('renders correctly', () => {
        render(<VisionCanvas onAddSample={() => {}} onPredict={() => {}} />);
        const canvas = screen.getByRole('img', { name: /drawing canvas/i });
        expect(canvas).toBeInTheDocument();
    });

    it('handles mouse drawing interaction', () => {
        const onAddSample = vi.fn();
        render(<VisionCanvas onAddSample={onAddSample} onPredict={() => {}} />);

        const canvas = screen.getByRole('img', { name: /drawing canvas/i });

        // Mock getBoundingClientRect
        canvas.getBoundingClientRect = vi.fn(() => ({
            left: 0,
            top: 0,
            width: 200,
            height: 200,
        }));

        // Simulate drawing
        fireEvent.mouseDown(canvas);
        fireEvent.mouseMove(canvas, { clientX: 20, clientY: 20 }); // Top-left corner
        fireEvent.mouseUp(canvas);
    });

    it('handles touch drawing interaction', () => {
        const onAddSample = vi.fn();
        render(<VisionCanvas onAddSample={onAddSample} onPredict={() => {}} />);

        const canvas = screen.getByRole('img', { name: /drawing canvas/i });

        // Mock getBoundingClientRect
        canvas.getBoundingClientRect = vi.fn(() => ({
            left: 0,
            top: 0,
            width: 200,
            height: 200,
        }));

        // Simulate touch
        fireEvent.touchStart(canvas, { touches: [{ clientX: 20, clientY: 20 }] });
        fireEvent.touchMove(canvas, { touches: [{ clientX: 40, clientY: 40 }] });
        fireEvent.touchEnd(canvas);
    });

    it('handles touch cancel', () => {
        render(<VisionCanvas onAddSample={() => {}} onPredict={() => {}} />);
        const canvas = screen.getByRole('img', { name: /drawing canvas/i });

        // Mock getBoundingClientRect
        canvas.getBoundingClientRect = vi.fn(() => ({
            left: 0,
            top: 0,
            width: 200,
            height: 200,
        }));

        fireEvent.touchStart(canvas, { touches: [{ clientX: 20, clientY: 20 }] });
        fireEvent.touchCancel(canvas);
    });

    it('calls onPredict when predict button is clicked', () => {
        const onPredict = vi.fn();
        render(<VisionCanvas onAddSample={() => {}} onPredict={onPredict} />);

        const predictBtn = screen.getByRole('button', { name: /predict/i });
        fireEvent.click(predictBtn);

        expect(onPredict).toHaveBeenCalled();
    });
});
