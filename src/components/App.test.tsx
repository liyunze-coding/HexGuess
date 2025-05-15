import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Home from '@/app/page'; // Adjust the import path to your component
import HexCodle from '@/components/HexGuess';


test('renders the home page', async () => {
    await act(async () => {
        render(<Home />);
    });
    expect(screen.getByText(/HexGuess/i)).toBeInTheDocument();
});

test('renders the "Rules" button', async () => {
    await act(async () => {
        render(<Home />);
    });
    expect(screen.getByRole('button', { name: /RULES/i })).toBeInTheDocument();
});

test('renders the "What is Hex?" button', async () => {
    await act(async () => {
        render(<Home />);
    });
    expect(screen.getByRole('button', { name: /WHAT IS HEX\?/i })).toBeInTheDocument();
});

test('renders the "Credits" button', async () => {
    await act(async () => {
        render(<Home />);
    });
    expect(screen.getByRole('button', { name: /CREDITS/i })).toBeInTheDocument();
});

test('renders HexCodle with a fixed color', async () => {
    // Example: Red (#FF0000)

    render(<HexCodle initialColor={['rgb(255,0,0)', '#FF0000']} />);
    const inputText = screen.getByLabelText('Input field for guessing hex value');
    const button = screen.getByLabelText('Submit button for guessing');
    await userEvent.type(inputText, '#FF0000');
    await userEvent.click(button);

    expect(screen.getByText(/Congrats!/i)).toBeInTheDocument();
});

test('Show congrats screen when guessed correctly', async () => {
    // Example: Red (#FF0000)

    render(<HexCodle initialColor={['rgb(255,0,0)', '#FF0000']} />);
    const inputText = screen.getByLabelText('Input field for guessing hex value');
    const button = screen.getByLabelText('Submit button for guessing');
    await userEvent.type(inputText, '#FF0000');
    await userEvent.click(button);

    expect(screen.getByText(/Congrats!/i)).toBeInTheDocument();
});

test('Show congrats screen when guessed correctly', async () => {
    // Example: Red (#FF0000)

    render(<HexCodle initialColor={['rgb(255,0,0)', '#FF0000']} />);
    const inputText = screen.getByLabelText('Input field for guessing hex value');
    const button = screen.getByLabelText('Submit button for guessing');

    for (let i = 0; i < 5; i++) {
        await userEvent.type(inputText, '#00FF00');
        await userEvent.click(button);
    }
    

    expect(screen.getByText(/Game Over/i)).toBeInTheDocument();
});