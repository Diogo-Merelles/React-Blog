import { render, screen, fireEvent } from '@testing-library/react';
import AddBlog from './AddBlog';

describe('AddBlog', () => {
  test('renders the form elements', () => {
    render(<AddBlog />);
    const titleInput = screen.getByLabelText('Title');
    const authorInput = screen.getByLabelText('Author');
    const urlInput = screen.getByLabelText('URL');
    const submitButton = screen.getByRole('button', { name: 'Add Blog' });

    expect(titleInput).toBeInTheDocument();
    expect(authorInput).toBeInTheDocument();
    expect(urlInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test('calls onSubmit with the form data when submitted', () => {
    const handleSubmit = jest.fn();
    render(<AddBlog onSubmit={handleSubmit} />);

    const titleInput = screen.getByLabelText('Title');
    const authorInput = screen.getByLabelText('Author');
    const urlInput = screen.getByLabelText('URL');
    const submitButton = screen.getByRole('button', { name: 'Add Blog' });

    const title = 'Blog Title';
    const author = 'Blog Author';
    const url = 'http://blog-url.com';
    fireEvent.change(titleInput, { target: { value: title } });
    fireEvent.change(authorInput, { target: { value: author } });
    fireEvent.change(urlInput, { target: { value: url } });
    fireEvent.click(submitButton);

    expect(handleSubmit).toHaveBeenCalledWith({
      title,
      author,
      url,
    });
  });
});