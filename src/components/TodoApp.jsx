import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import './TodoApp.css';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await axios.get('/api/todos');
    setTodos(response.data);
  };

  const addTodo = async (text, status) => {
    const response = await axios.post('/api/todos', { text, status });
    setTodos([...todos, response.data]);
  };

  const deleteTodo = async (id) => {
    await axios.delete(`/api/todos/${id}`);
    setTodos(todos.filter(todo => todo._id !== id));
  };

  const toggleTodo = async (id) => {
    const todo = todos.find(todo => todo._id === id);
    const response = await axios.put(`/api/todos/${id}`, {
      ...todo,
      status: todo.status === 'completed' ? 'ongoing' : 'completed'
    });
    setTodos(todos.map(todo => (todo._id === id ? response.data : todo)));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') return true;
    if (filter === 'completed') return todo.status === 'completed';
    if (filter === 'ongoing') return todo.status === 'ongoing';
    
    return false; 
  });
  

  return (
    <div className="todo-app">
      <h1>Todo Dashboard</h1>
      <TodoForm addTodo={addTodo} />
      <div className="filter-buttons">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button onClick={() => setFilter('ongoing')}>Ongoing</button>
      </div>
      <TodoList todos={filteredTodos} deleteTodo={deleteTodo} toggleTodo={toggleTodo} />
    </div>
  );
};

export default TodoApp;
