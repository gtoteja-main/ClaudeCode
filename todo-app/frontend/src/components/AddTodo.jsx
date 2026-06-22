import React, { useState } from 'react';

export default function AddTodo({ onAdd }) {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) {
      onAdd(value.trim());
      setValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        placeholder="Add a new task..."
        value={value}
        onChange={e => setValue(e.target.value)}
        style={styles.input}
      />
      <button type="submit" style={styles.button} disabled={!value.trim()}>
        Add
      </button>
    </form>
  );
}

const styles = {
  form: { display: 'flex', gap: '10px', marginBottom: '24px' },
  input: {
    flex: 1,
    padding: '12px 16px',
    borderRadius: '12px',
    border: 'none',
    fontSize: '15px',
    outline: 'none',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    color: '#1f2937',
  },
  button: {
    padding: '12px 22px',
    borderRadius: '12px',
    border: 'none',
    background: '#667eea',
    color: '#fff',
    fontWeight: 600,
    fontSize: '15px',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
};
