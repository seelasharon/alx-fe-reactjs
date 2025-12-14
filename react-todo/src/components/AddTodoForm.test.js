import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddTodoForm from './AddTodoForm';

describe('AddTodoForm Component', () => {
  test('renders input and button', () => {
    render(<AddTodoForm onAdd={() => {}} />);
    expect(screen.getByPlaceholderText('Add a new todo')).toBeInTheDocument();
    expect(screen.getByText('Add')).toBeInTheDocument();
  });

  test('calls onAdd with input value', () => {
    const onAddMock = jest.fn();
    render(<AddTodoForm onAdd={onAddMock} />);
    const input = screen.getByPlaceholderText('Add a new todo');
    const addButton = screen.getByText('Add');
    fireEvent.change(input, { target: { value: 'Test AddTodoForm' } });
    fireEvent.click(addButton);
    expect(onAddMock).toHaveBeenCalledWith('Test AddTodoForm');
  });
});
