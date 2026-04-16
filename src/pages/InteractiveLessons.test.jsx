import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { InteractiveLessons } from './InteractiveLessons';

describe('InteractiveLessons Page', () => {
    test('renders the main heading', () => {
        render(<BrowserRouter><InteractiveLessons /></BrowserRouter>);
        // There are multiple "Interactive Lessons" in the DOM (header + footer link),
        // so scope to the h1 heading.
        const heading = screen.getByRole('heading', { level: 1 });
        expect(heading).toHaveTextContent(/Interactive Lessons/i);
    });
});
