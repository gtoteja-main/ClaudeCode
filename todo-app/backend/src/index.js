const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

let todos = [
  { id: uuidv4(), title: 'Buy groceries', completed: false, createdAt: new Date().toISOString() },
  { id: uuidv4(), title: 'Read a book', completed: true, createdAt: new Date().toISOString() },
];

app.get('/api/todos', (req, res) => {
  res.json(todos);
});

app.post('/api/todos', (req, res) => {
  const { title } = req.body;
  if (!title || !title.trim()) {
    return res.status(400).json({ error: 'Title is required' });
  }
  const todo = { id: uuidv4(), title: title.trim(), completed: false, createdAt: new Date().toISOString() };
  todos.push(todo);
  res.status(201).json(todo);
});

app.put('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const index = todos.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({ error: 'Todo not found' });
  todos[index] = { ...todos[index], ...(title !== undefined && { title }), ...(completed !== undefined && { completed }) };
  res.json(todos[index]);
});

app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const index = todos.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({ error: 'Todo not found' });
  todos.splice(index, 1);
  res.status(204).send();
});

app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
