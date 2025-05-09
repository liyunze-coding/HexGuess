import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '@/app/page'; // Adjust the import path to your component

test('renders the home page', () => {
    render(<Home />);
    expect(screen.getByText(/HexGuess/i)).toBeInTheDocument();
});