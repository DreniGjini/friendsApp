/* eslint-disable testing-library/prefer-screen-queries */
import { render, fireEvent } from '@testing-library/react';
import Dropdown from './index';

describe('Dropdown component', () => {
  test('renders children when toggler is clicked', () => {
    const { getByTestId } = render(
      <Dropdown
        initiator={<button data-testid="toggler-button">Toggle</button>}
        padding={true}
      >
        <div>Content</div>
      </Dropdown>,
    );

    const toggler = getByTestId('toggler-button');
    const content = getByTestId('content');

    expect(content).not.toHaveClass('opacity-100');

    fireEvent.click(toggler);

    expect(content).toHaveClass('opacity-100');
  });
});
