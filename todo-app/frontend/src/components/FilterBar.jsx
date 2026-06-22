import React from 'react';

const filters = ['All', 'Active', 'Completed'];

export default function FilterBar({ current, onChange, counts }) {
  return (
    <div style={styles.bar}>
      {filters.map(f => (
        <button
          key={f}
          onClick={() => onChange(f)}
          style={{ ...styles.btn, ...(current === f ? styles.active : {}) }}
        >
          {f} <span style={styles.badge}>{counts[f]}</span>
        </button>
      ))}
    </div>
  );
}

const styles = {
  bar: { display: 'flex', gap: '8px', marginBottom: '16px' },
  btn: {
    padding: '6px 14px',
    borderRadius: '20px',
    border: 'none',
    background: 'rgba(255,255,255,0.2)',
    color: '#fff',
    fontWeight: 500,
    fontSize: '13px',
    cursor: 'pointer',
    display: 'flex', alignItems: 'center', gap: '6px',
    transition: 'background 0.2s',
  },
  active: { background: '#fff', color: '#667eea' },
  badge: {
    background: 'rgba(0,0,0,0.12)',
    borderRadius: '10px',
    padding: '1px 7px',
    fontSize: '11px',
    fontWeight: 700,
  },
};
