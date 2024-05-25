import React from 'react';

const TodoList = ({ todos, deleteTodo, toggleTodo }) => {
  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <li key={todo._id} className={`todo-item ${todo.status}`}>
          <span
            onClick={() => toggleTodo(todo._id)}
            style={{ textDecoration: todo.status === 'completed' ? 'line-through' : 'none' }}
          >
            {todo.text}
          </span>
          <input
            type="checkbox"
            checked={todo.status === 'completed'}
            onChange={() => toggleTodo(todo._id)}
          />
          <button onClick={() => deleteTodo(todo._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
