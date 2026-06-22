import React, { useState } from 'react';

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(todo.title);

  const handleSave = () => {
    if (value.trim()) {
      onEdit(todo.id, value.trim());
    }
    setEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') { setValue(todo.title); setEditing(false); }
  };

  return (
    <div style={styles.item}>
      <button onClick={() => onToggle(todo.id)} style={{ ...styles.checkbox, ...(todo.completed ? styles.checked : {}) }}>
        {todo.completed && <span style={styles.checkmark}>✓</span>}
      </button>

      {editing ? (
        <input
          autoFocus
          value={value}
          onChange={e => setValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          style={styles.editInput}
        />
      ) : (
        <span
          onDoubleClick={() => setEditing(true)}
          style={{ ...styles.title, ...(todo.completed ? styles.completed : {}) }}
        >
          {todo.title}
        </span>
      )}

      <div style={styles.actions}>
        {!editing && (
          <button onClick={() => setEditing(true)} style={styles.editBtn} title="Edit">
            ✏️
          </button>
        )}
        <button onClick={() => onDelete(todo.id)} style={styles.deleteBtn} title="Delete">
          🗑️
        </button>
      </div>
    </div>
  );
}

const styles = {
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '14px 16px',
    background: '#fff',
    borderRadius: '12px',
    marginBottom: '10px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
    transition: 'box-shadow 0.2s',
  },
  checkbox: {
    width: '22px', height: '22px',
    borderRadius: '50%',
    border: '2px solid #d1d5db',
    background: 'transparent',
    cursor: 'pointer',
    flexShrink: 0,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'all 0.2s',
  },
  checked: {
    background: '#667eea',
    borderColor: '#667eea',
  },
  checkmark: { color: '#fff', fontSize: '12px', fontWeight: 700 },
  title: {
    flex: 1,
    fontSize: '15px',
    color: '#1f2937',
    cursor: 'default',
  },
  completed: {
    textDecoration: 'line-through',
    color: '#9ca3af',
  },
  editInput: {
    flex: 1,
    border: 'none',
    outline: '2px solid #667eea',
    borderRadius: '6px',
    padding: '4px 8px',
    fontSize: '15px',
    color: '#1f2937',
  },
  actions: { display: 'flex', gap: '4px', flexShrink: 0 },
  editBtn: {
    background: 'none', border: 'none', cursor: 'pointer',
    fontSize: '15px', padding: '4px', borderRadius: '6px',
    opacity: 0.5, transition: 'opacity 0.2s',
  },
  deleteBtn: {
    background: 'none', border: 'none', cursor: 'pointer',
    fontSize: '15px', padding: '4px', borderRadius: '6px',
    opacity: 0.5, transition: 'opacity 0.2s',
  },
};
