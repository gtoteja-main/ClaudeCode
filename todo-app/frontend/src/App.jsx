import React, { useState, useEffect } from 'react';
import AddTodo from './components/AddTodo';
import TodoItem from './components/TodoItem';
import FilterBar from './components/FilterBar';

const API = `${process.env.REACT_APP_API_URL || ''}/api/todos`;

export default function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API)
      .then(r => r.json())
      .then(data => { setTodos(data); setLoading(false); })
      .catch(() => { setError('Could not connect to backend. Start the server with: cd backend && npm install && npm run dev'); setLoading(false); });
  }, []);

  const addTodo = async (title) => {
    const res = await fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title }) });
    const todo = await res.json();
    setTodos(prev => [...prev, todo]);
  };

  const toggleTodo = async (id) => {
    const todo = todos.find(t => t.id === id);
    const res = await fetch(`${API}/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ completed: !todo.completed }) });
    const updated = await res.json();
    setTodos(prev => prev.map(t => t.id === id ? updated : t));
  };

  const editTodo = async (id, title) => {
    const res = await fetch(`${API}/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title }) });
    const updated = await res.json();
    setTodos(prev => prev.map(t => t.id === id ? updated : t));
  };

  const deleteTodo = async (id) => {
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  const clearCompleted = () => todos.filter(t => t.completed).forEach(t => deleteTodo(t.id));

  const filtered = todos.filter(t =>
    filter === 'Active' ? !t.completed : filter === 'Completed' ? t.completed : true
  );

  const counts = {
    All: todos.length,
    Active: todos.filter(t => !t.completed).length,
    Completed: todos.filter(t => t.completed).length,
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.heading}>My Tasks</h1>
        <p style={styles.subheading}>{counts.Active} task{counts.Active !== 1 ? 's' : ''} remaining</p>

        <AddTodo onAdd={addTodo} />
        <FilterBar current={filter} onChange={setFilter} counts={counts} />

        {loading && <p style={styles.message}>Loading...</p>}
        {error && <p style={{ ...styles.message, color: '#fca5a5', fontSize: '13px' }}>{error}</p>}

        {!loading && !error && filtered.length === 0 && (
          <p style={styles.message}>
            {filter === 'Completed' ? 'No completed tasks yet.' : filter === 'Active' ? 'All done! Great work.' : 'No tasks yet. Add one above!'}
          </p>
        )}

        {filtered.map(todo => (
          <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} onDelete={deleteTodo} onEdit={editTodo} />
        ))}

        {counts.Completed > 0 && (
          <button onClick={clearCompleted} style={styles.clearBtn}>
            Clear {counts.Completed} completed
          </button>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '40px' },
  container: { width: '100%', maxWidth: '560px' },
  heading: { color: '#fff', fontSize: '36px', fontWeight: 700, marginBottom: '4px' },
  subheading: { color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginBottom: '28px' },
  message: { textAlign: 'center', color: 'rgba(255,255,255,0.7)', padding: '32px 0', fontSize: '15px' },
  clearBtn: {
    marginTop: '16px',
    background: 'none',
    border: '1px solid rgba(255,255,255,0.3)',
    color: 'rgba(255,255,255,0.7)',
    padding: '8px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '13px',
    width: '100%',
  },
};
