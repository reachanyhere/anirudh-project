import { render, screen, fireEvent } from '@testing-library/react';
import Home from './Home';

describe('Home Component', () => {
  test('renders home page with title', () => {
    render(<Home />);
    expect(screen.getByText('Dynamic Table Using Lists')).toBeInTheDocument();
  });

  test('renders table header', () => {
    render(<Home />);
    expect(screen.getByText('ID | Name | Email | Role')).toBeInTheDocument();
  });

  test('renders initial table data', () => {
    render(<Home />);
    expect(
      screen.getByText(/1 \| John Doe \| john@example\.com \| Developer/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/2 \| Jane Smith \| jane@example\.com \| Designer/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/3 \| Bob Johnson \| bob@example\.com \| Manager/),
    ).toBeInTheDocument();
  });

  test('renders add new row form', () => {
    render(<Home />);
    expect(screen.getByText('Add New Row')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Role')).toBeInTheDocument();
    expect(screen.getByText('Add Row')).toBeInTheDocument();
  });

  test('updates input fields when typing', () => {
    render(<Home />);
    const nameInput = screen.getByPlaceholderText('Name');
    const emailInput = screen.getByPlaceholderText('Email');
    const roleInput = screen.getByPlaceholderText('Role');

    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(roleInput, { target: { value: 'Tester' } });

    expect(nameInput.value).toBe('Test User');
    expect(emailInput.value).toBe('test@example.com');
    expect(roleInput.value).toBe('Tester');
  });

  test('adds new row when all fields are filled and button is clicked', () => {
    render(<Home />);
    const nameInput = screen.getByPlaceholderText('Name');
    const emailInput = screen.getByPlaceholderText('Email');
    const roleInput = screen.getByPlaceholderText('Role');
    const addButton = screen.getByText('Add Row');

    // Fill in the form
    fireEvent.change(nameInput, { target: { value: 'New User' } });
    fireEvent.change(emailInput, { target: { value: 'newuser@example.com' } });
    fireEvent.change(roleInput, { target: { value: 'New Role' } });

    // Click add button
    fireEvent.click(addButton);

    // Check if new row is added
    expect(
      screen.getByText(/4 \| New User \| newuser@example\.com \| New Role/),
    ).toBeInTheDocument();

    // Check if form is cleared
    expect(nameInput.value).toBe('');
    expect(emailInput.value).toBe('');
    expect(roleInput.value).toBe('');
  });

  test('does not add row when fields are empty', () => {
    render(<Home />);
    const addButton = screen.getByText('Add Row');

    // Click add button without filling fields
    fireEvent.click(addButton);

    // Check that no new row is added (should still have only 3 rows)
    const listItems = screen.getAllByRole('listitem');
    // 1 header + 3 data rows + 4 form items = 8 total
    expect(listItems.length).toBe(8);
  });

  test('does not add row when only some fields are filled', () => {
    render(<Home />);
    const nameInput = screen.getByPlaceholderText('Name');
    const addButton = screen.getByText('Add Row');

    // Fill only name field
    fireEvent.change(nameInput, { target: { value: 'Partial User' } });
    fireEvent.click(addButton);

    // Check that no new row is added
    expect(screen.queryByText(/Partial User/)).not.toBeInTheDocument();
  });

  test('can add multiple rows', () => {
    render(<Home />);
    const nameInput = screen.getByPlaceholderText('Name');
    const emailInput = screen.getByPlaceholderText('Email');
    const roleInput = screen.getByPlaceholderText('Role');
    const addButton = screen.getByText('Add Row');

    // Add first new row
    fireEvent.change(nameInput, { target: { value: 'First New' } });
    fireEvent.change(emailInput, { target: { value: 'first@example.com' } });
    fireEvent.change(roleInput, { target: { value: 'First Role' } });
    fireEvent.click(addButton);

    // Add second new row
    fireEvent.change(nameInput, { target: { value: 'Second New' } });
    fireEvent.change(emailInput, { target: { value: 'second@example.com' } });
    fireEvent.change(roleInput, { target: { value: 'Second Role' } });
    fireEvent.click(addButton);

    // Check both rows are added
    expect(
      screen.getByText(/4 \| First New \| first@example\.com \| First Role/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/5 \| Second New \| second@example\.com \| Second Role/),
    ).toBeInTheDocument();
  });
});
