/* eslint-disable testing-library/prefer-screen-queries */
import { render, fireEvent } from '@testing-library/react';
import Button from './index';

describe('Button component', () => {
  it('renders with dark background when dark prop is true', () => {
    const { getByText } = render(<Button dark>Click me</Button>);
    const button = getByText('Click me');
    expect(button).toHaveClass('text-white bg-gray-600');
  });

  it('renders with light background when dark prop is false', () => {
    const { getByText } = render(<Button>Click me</Button>);
    const button = getByText('Click me');
    expect(button).toHaveClass('text-black bg-white');
  });

  it('calls onClick function when clicked', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Button onClick={handleClick}>Click me</Button>,
    );
    const button = getByText('Click me');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
  });
});
