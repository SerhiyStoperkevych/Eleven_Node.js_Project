const Todo = require('../models/ToDo');

// Get all todos for a user
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.id });
    res.json(todos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Create a new todo
exports.createTodo = async (req, res) => {
  const { title } = req.body;
  try {
    const newTodo = new Todo({
      title,
      userId: req.user.id,
    });
    const todo = await newTodo.save();
    res.json(todo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update an existing todo
exports.updateTodo = async (req, res) => {
  const { title, completed } = req.body;
  try {
    let todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ msg: 'Todo not found' });
    }
    if (todo.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    todo = await Todo.findByIdAndUpdate(req.params.id, { title, completed }, { new: true });
    res.json(todo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Delete a todo
exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ msg: 'Todo not found' });
    }
    if (todo.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    await Todo.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Todo removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
