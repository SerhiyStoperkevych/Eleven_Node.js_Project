const express = require('express');
const { getUsers } = require('../data/loadData');
const { saveUsers } = require('../data/saveData');
const router = express.Router();

let users = getUsers();

router.post('/signUp', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const userExists = users.some(user => user.username === username);
  if (userExists) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  const newUser = {
    id: Date.now(),
    username,
    password
  };

  users.push(newUser);
  saveUsers(users);
  res.status(201).json({ message: 'User created successfully' });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;
