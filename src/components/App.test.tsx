import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Home from '@/app/page'; // Adjust the import path to your component
import HexCodle from '@/components/HexGuess';


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

test('Show Game Over when use up 5 tries', async () => {
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