const fs = require('fs');
const USERS_PATH = './data/users.json';
const TASKS_PATH = './data/tasks.json';
const STORE_PATH = './data/store.json';

let users = [];
let tasks = [];
let stores = [];

const loadUsers = () => {
  if (fs.existsSync(USERS_PATH)) {
    const data = fs.readFileSync(USERS_PATH, 'utf8');
    users = JSON.parse(data);
  }
};

const loadTasks = () => {
  if (fs.existsSync(TASKS_PATH)) {
    const data = fs.readFileSync(TASKS_PATH, 'utf8');
    tasks = JSON.parse(data);
  }
};

const loadStore = () => {
  if (fs.existsSync(STORE_PATH)) {
    const data = fs.readFileSync(STORE_PATH, 'utf8');
    stores = JSON.parse(data);
  }
};

const getUsers = () => users;
const getTasks = () => tasks;
const getStores = () => stores;

loadUsers();
loadTasks();
loadStore();

module.exports = {
  getUsers,
  getTasks,
  getStores,
  loadUsers,
  loadTasks,
  loadStore,
};
