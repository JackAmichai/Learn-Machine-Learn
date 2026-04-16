
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { GoogleResources } from './GoogleResources';
import { describe, test, expect } from 'vitest';

describe('GoogleResources Page', () => {
    test('renders the main heading', () => {
        render(<BrowserRouter><GoogleResources /></BrowserRouter>);
        expect(screen.getByText(/Interactive Lessons/i)).toBeInTheDocument();
    });
});
