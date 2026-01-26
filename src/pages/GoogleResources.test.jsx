import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { GoogleResources } from './GoogleResources';

describe('GoogleResources Page', () => {
    it('renders the main heading', () => {
        render(
            <MemoryRouter>
                <GoogleResources />
            </MemoryRouter>
        );

        expect(screen.getByText(/Google ML/i)).toBeInTheDocument();
        expect(screen.getByText(/RESOURCES/i)).toBeInTheDocument();
    });

    it('renders section headings', () => {
        render(
            <MemoryRouter>
                <GoogleResources />
            </MemoryRouter>
        );

        expect(screen.getByText('Foundational Courses')).toBeInTheDocument();
        expect(screen.getByText('Advanced Topics')).toBeInTheDocument();
        expect(screen.getByText('Essential Guides')).toBeInTheDocument();
        expect(screen.getByText('Glossaries')).toBeInTheDocument();
    });

    it('renders links to Google resources', () => {
        render(
            <MemoryRouter>
                <GoogleResources />
            </MemoryRouter>
        );

        const crashCourse = screen.getByText('Machine Learning Crash Course');
        expect(crashCourse.closest('a')).toHaveAttribute('href', 'https://developers.google.com/machine-learning/crash-course');
    });
});
