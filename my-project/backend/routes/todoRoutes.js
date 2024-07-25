const express = require('express');
const router = express.Router();
const { getTodos, createTodo, updateTodo, deleteTodo } = require('../constrollers/todoController');
const authMiddleware = require('../middleware/auth')

router.get('/', authMiddleware, getTodos);
router.post('/', authMiddleware, createTodo);
router.put(':id', authMiddleware, updateTodo);
router.delete(':id', authMiddleware, deleteTodo);

module.exports = router;
