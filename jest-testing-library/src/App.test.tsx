import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

const sum = (x: number, y: number) => {
  return x + y;
};

describe('App Component', () => {
  it('should sum correctly', () => {
    expect(sum(4, 4)).toBe(8);
    expect(sum(4, 4)).toBeGreaterThan(7);
  });

  it('should render App with hello message', () => {
    render(<App />);
    screen.getByText('Hello world!'); // Producra o texto em algum lugar do componente
  });

  it('should change message on button click', () => {
    render(<App />);

    screen.getByText("Let's learn more about testing in react");
    const button = screen.getByText(/change message/i);

    fireEvent.click(button);
    screen.getByText(/new message/i);

    // queryByText -> não falha o teste quando não acha
    const oldMessage = screen.queryByText("Let's learn more about testing in react");

    expect(oldMessage).toBeNull();

    // not, nega a query
    expect(oldMessage).not.toBeInTheDocument();
  });
});
