import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '@/app/page'; // Adjust the import path to your component

test('renders the home page', () => {
    render(<Home />);
    expect(screen.getByText(/HexGuess/i)).toBeInTheDocument();
});

test('renders the "Rules" button', () => {
    render(<Home />);
    expect(screen.getByRole('button', { name: /RULES/i })).toBeInTheDocument();
});

test('renders the "What is Hex?" button', () => {
    render(<Home />);
    expect(screen.getByRole('button', { name: /WHAT IS HEX\?/i })).toBeInTheDocument();
});

test('renders the "Credits" button', () => {
    render(<Home />);
    expect(screen.getByRole('button', { name: /CREDITS/i })).toBeInTheDocument();
});