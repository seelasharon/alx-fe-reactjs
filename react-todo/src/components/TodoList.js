import React, { useState } from 'react';
import AddTodoForm from './AddTodoForm';

// Static initial todos
const initialTodos = [
  { id: 1, text: 'Learn React', completed: false },
  { id: 2, text: 'Build a Todo App', completed: false },
  { id: 3, text: 'Master JavaScript', completed: false },
];

function TodoList() {
  const [todos, setTodos] = useState(initialTodos);

  // Add a new todo
  const addTodo = (text) => {
    setTodos([
      ...todos,
      { id: Date.now(), text, completed: false },
    ]);
  };

  // Toggle completed state
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete a todo
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <h2>Todo List</h2>
      <AddTodoForm onAdd={addTodo} />
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            onClick={() => toggleTodo(todo.id)}
            style={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '0.5rem',
            }}
          >
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text}</span>
            <button onClick={(e) => { e.stopPropagation(); deleteTodo(todo.id); }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
