const fs = require('fs');
const USERS_PATH = './data/users.json';
const TASKS_PATH = './data/tasks.json';

const saveUsers = (users) => {
  fs.writeFileSync(USERS_PATH, JSON.stringify(users, null, 2));
};

const saveTasks = (tasks) => {
  fs.writeFileSync(TASKS_PATH, JSON.stringify(tasks, null, 2));
};

module.exports = {
  saveUsers,
  saveTasks,
};
