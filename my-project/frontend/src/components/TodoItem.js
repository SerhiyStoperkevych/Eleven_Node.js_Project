import React from 'react';

const TodoItem = ({ todo, onUpdate, onDelete }) => {
  return (
    <div>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onUpdate(todo._id, { ...todo, completed: !todo.completed })}
      />
      <span>{todo.title}</span>
      <button onClick={() => onDelete(todo._id)}>Delete</button>
    </div>
  );
};

export default TodoItem;
