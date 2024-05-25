import React, { useState } from 'react';

const TodoForm = ({ addTodo }) => {
  const [text, setText] = useState('');
  const [status, setStatus] = useState('ongoing');

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(text, status);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo"
        required
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="ongoing">Ongoing</option>
        <option value="completed">Completed</option>
      </select>
      <button type="submit">Add</button>
    </form>
  );
};

export default TodoForm;
