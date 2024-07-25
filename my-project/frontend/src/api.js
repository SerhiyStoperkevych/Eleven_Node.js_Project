import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/users/register`, userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}/users/login`, userData);
  return response.data;
};

export const getTodos = async (token) => {
  const response = await axios.get(`${API_URL}/todos`, {
    headers: {
      'x-auth-token': token,
    },
  });
  return response.data;
};

export const createTodo = async (todoData, token) => {
  const response = await axios.post(`${API_URL}/todos`, todoData, {
    headers: {
      'x-auth-token': token,
    },
  });
  return response.data;
};

export const updateTodo = async (todoId, todoData, token) => {
  const response = await axios.put(`${API_URL}/todos/${todoId}`, todoData, {
    headers: {
      'x-auth-token': token,
    },
  });
  return response.data;
};

export const deleteTodo = async (todoId, token) => {
  const response = await axios.delete(`${API_URL}/todos/${todoId}`, {
    headers: {
      'x-auth-token': token,
    },
  });
  return response.data;
};
