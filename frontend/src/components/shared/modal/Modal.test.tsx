/* eslint-disable testing-library/prefer-screen-queries */
import { render, fireEvent } from '@testing-library/react';
import Modal from './index';

describe('Modal component', () => {
  test('renders modal when isOpen is true', () => {
    const { getByTestId } = render(
      <Modal isOpen={true} onClose={() => {}}>
        <div data-testid="modal-content">Modal Content</div>
      </Modal>,
    );

    const modalContent = getByTestId('modal-content');

    expect(modalContent).toBeInTheDocument();
  });

  test('calls onClose when clicking outside the modal', () => {
    const onCloseMock = jest.fn();

    const { getByTestId } = render(
      <Modal isOpen={true} onClose={onCloseMock}>
        <div>Modal Content</div>
      </Modal>,
    );

    const modalOverlay = getByTestId('modal-overlay');

    fireEvent.click(modalOverlay);

    expect(onCloseMock).toHaveBeenCalled();
  });
});
