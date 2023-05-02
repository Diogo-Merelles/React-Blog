import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import UserProfile from './UserProfile';

describe('UserProfile component', () => {
  it('should render without crashing', () => {
    render(<UserProfile />);
    expect(screen.getByText(/Update Credentials/i)).toBeInTheDocument();
  });

  it('should show loading message when loading', () => {
    const { getByText } = render(<UserProfile />);
    expect(getByText('Loading...')).toBeInTheDocument();
  });

  it('should update state when user types in input fields', async () => {
    const { getByPlaceholderText } = render(<UserProfile />);
    const emailInput = getByPlaceholderText(/E-mail/i);
    const passwordInput = getByPlaceholderText(/Password/i);

    fireEvent.change(emailInput, { target: { value: 'testuser@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

    await waitFor(() => {
      expect(emailInput).toHaveValue('testuser@test.com');
      expect(passwordInput).toHaveValue('testpassword');
    });
  });

  it('should display error message when input is invalid', async () => {
    const { getByPlaceholderText, getByText } = render(<UserProfile />);
    const emailInput = getByPlaceholderText(/E-mail/i);

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(getByText(/Invalid email address/i)).toBeInTheDocument();
    });
  });

  it('should submit form when "Confirm changes" button is clicked', async () => {
    const mockPut = jest.fn();
    jest.mock('axios', () => ({
      put: () => ({ status: 200 }),
    }));

    const { getByPlaceholderText, getByTestId } = render(<UserProfile />);
    const emailInput = getByPlaceholderText(/E-mail/i);
    const passwordInput = getByPlaceholderText(/Password/i);
    const submitButton = getByTestId('submit-button');

    fireEvent.change(emailInput, { target: { value: 'testuser@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockPut).toHaveBeenCalledTimes(1);
      expect(mockPut).toHaveBeenCalledWith(
        'http://localhost:5000/user/undefined',
        {
          email: 'testuser@test.com',
          password: 'testpassword',
        }
      );
    });
  });

  it('should navigate back to home page when "Go Back" button is clicked', () => {
    const mockNavigate = jest.fn();
    jest.mock('react-router-dom', () => ({
      useNavigate: () => mockNavigate,
    }));

    const { getByText } = render(<UserProfile />);
    const goBackButton = getByText(/Go Back/i);

    fireEvent.click(goBackButton);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});