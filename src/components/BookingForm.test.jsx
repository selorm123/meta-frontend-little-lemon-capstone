import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';       // vitest mocking functions
import BookingForm from './BookingForm';

describe('BookingForm component', () => {
  const mockDispatch = vi.fn();
  const mockSubmitForm = vi.fn();
  const availableTimes = ['12:00', '13:00', '14:00'];

  beforeEach(() => {
    mockDispatch.mockClear();
    mockSubmitForm.mockClear();

    render(
      <BookingForm
        availableTimes={availableTimes}
        dispatch={mockDispatch}
        submitForm={mockSubmitForm}
      />
    );
  });

  test('renders form fields with initial values', () => {
    expect(screen.getByLabelText(/first name/i)).toHaveValue('');
    expect(screen.getByLabelText(/last name/i)).toHaveValue('');
    expect(screen.getByLabelText(/contact no\./i)).toHaveValue('');
    expect(screen.getByLabelText(/choose date/i)).toHaveValue('');
    expect(screen.getByLabelText(/choose time/i)).toHaveValue('12:00');
    expect(screen.getByLabelText(/number of guests/i)).toHaveValue(1);
    expect(screen.getByLabelText(/occasion/i)).toHaveValue('Birthday');
  });

  test('updates state on input change', () => {
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'John' } });
    expect(screen.getByLabelText(/first name/i)).toHaveValue('John');

    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Doe' } });
    expect(screen.getByLabelText(/last name/i)).toHaveValue('Doe');
  });

  test('dispatch is called with correct action when date changes', () => {
    const dateInput = screen.getByLabelText(/choose date/i);
    fireEvent.change(dateInput, { target: { value: '2025-09-10' } });

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'UPDATE_TIMES', payload: '2025-09-10' });
    expect(dateInput).toHaveValue('2025-09-10');
  });

  test('calls submitForm with form data on submit', () => {
    // Fill required fields
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'Jane' } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Smith' } });
    fireEvent.change(screen.getByLabelText(/choose date/i), { target: { value: '2025-09-12' } });
    fireEvent.change(screen.getByLabelText(/choose time/i), { target: { value: '12:00' } });

    const form = screen.getByRole('form', { name: /booking form/i });
    fireEvent.submit(form);


    expect(mockSubmitForm).toHaveBeenCalledWith(expect.objectContaining({
      firstName: 'Jane',
      lastName: 'Smith',
      date: '2025-09-12',
      time: '12:00',
    }));
  });
});
