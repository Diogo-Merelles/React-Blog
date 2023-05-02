import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  test('renders properly', () => {
    const { getByPlaceholderText } = render(<SearchBar onChange={() => {}} value="" />);
    const inputElement = getByPlaceholderText('Search blog...');
    expect(inputElement).toBeInTheDocument();
  });

  test('calls onChange handler when input value is changed', () => {
    const onChangeMock = jest.fn();
    const { getByPlaceholderText } = render(<SearchBar onChange={onChangeMock} value="" />);
    const inputElement = getByPlaceholderText('Search blog...');
    fireEvent.change(inputElement, { target: { value: 'react' } });
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith({ target: { value: 'react' } });
  });
});