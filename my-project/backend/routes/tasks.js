const express = require('express');
const { getTasks } = require('../data/loadData');
const { saveTasks } = require('../data/saveData');
const router = express.Router();

let tasks = getTasks();

router.get('/', (req, res) => {
  tasks.sort((a, b) => b.importa - a.importa); // Sort tasks by importa in descending order
  res.json(tasks);
});

router.post('/', (req, res) => {
  const { importa, text } = req.body;

  if (!text) {
    return res.status(400).json({ message: 'Text is required' });
  }

  const taskExists = tasks.some(task => task.text === text);
  if (taskExists) {
    return res.status(400).json({ message: 'Task already exists' });
  }

  const newTask = {
    importa: importa || 0, // Default to 0 if importa is not provided
    id: Date.now(),
    text
  };

  tasks.push(newTask);
  saveTasks(tasks);
  res.status(201).json({ message: 'Task created successfully' });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter(task => task.id !== parseInt(id, 10));

  saveTasks(tasks);
  res.sendStatus(204);
});

module.exports = router;
