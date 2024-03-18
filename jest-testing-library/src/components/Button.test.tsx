import { render, screen, fireEvent } from '@testing-library/react';

import Button from './Button';

describe('Button Component', () => {
  it('should render with red background if disabled', () => {
    render(
      <Button disabled={false} onClick={() => {}}>
        Click me
      </Button>
    );

    const button = screen.getByRole('button', { name: 'Click me' });

    expect(button).toHaveStyle({ backgroundColor: 'blue' });
  });

  it('should call onClick prop on click', () => {
    const onClick = jest.fn();
    render(
      <Button disabled onClick={onClick}>
        Click me
      </Button>
    );

    const button = screen.getByText(/click me/i);

    fireEvent.click(button);

    expect(onClick).toHaveBeenCalled();
    // Função com parametro
    // expect(onClick).toHaveBeenCalledWith(10);
  });
});
