import React, { useState, useEffect } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../api';
import TodoItem from './TodoItem';

const TodoList = ({ token }) => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      const fetchedTodos = await getTodos(token);
      setTodos(fetchedTodos);
    };
    fetchTodos();
  }, [token]);

  const handleAddTodo = async () => {
    const todo = await createTodo({ title: newTodo }, token);
    setTodos([...todos, todo]);
    setNewTodo('');
  };

  const handleUpdateTodo = async (id, updatedTodo) => {
    const todo = await updateTodo(id, updatedTodo, token);
    setTodos(todos.map(t => (t._id === id ? todo : t)));
  };

  const handleDeleteTodo = async (id) => {
    await deleteTodo(id, token);
    setTodos(todos.filter(t => t._id !== id));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="New Todo"
      />
      <button onClick={handleAddTodo}>Add</button>
      <div>
        {todos.map(todo => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onUpdate={handleUpdateTodo}
            onDelete={handleDeleteTodo}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
