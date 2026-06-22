const { v4: uuidv4 } = require('uuid');

// NOTE: In-memory store — resets on cold starts. Replace with a database for persistence.
let todos = [
  { id: uuidv4(), title: 'Buy groceries', completed: false, createdAt: new Date().toISOString() },
  { id: uuidv4(), title: 'Read a book', completed: true, createdAt: new Date().toISOString() },
];

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const id = req.url.split('/').filter(Boolean).pop();
  const isCollection = !id || id === 'todos';

  if (req.method === 'GET') {
    return res.json(todos);
  }

  if (req.method === 'POST') {
    const { title } = req.body;
    if (!title || !title.trim()) return res.status(400).json({ error: 'Title is required' });
    const todo = { id: uuidv4(), title: title.trim(), completed: false, createdAt: new Date().toISOString() };
    todos.push(todo);
    return res.status(201).json(todo);
  }

  if (req.method === 'PUT') {
    const index = todos.findIndex(t => t.id === id);
    if (index === -1) return res.status(404).json({ error: 'Todo not found' });
    const { title, completed } = req.body;
    todos[index] = {
      ...todos[index],
      ...(title !== undefined && { title }),
      ...(completed !== undefined && { completed }),
    };
    return res.json(todos[index]);
  }

  if (req.method === 'DELETE') {
    const index = todos.findIndex(t => t.id === id);
    if (index === -1) return res.status(404).json({ error: 'Todo not found' });
    todos.splice(index, 1);
    return res.status(204).end();
  }

  res.status(405).json({ error: 'Method not allowed' });
};
