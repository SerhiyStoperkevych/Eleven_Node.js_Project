import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import TodoList from './components/TodoList';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const setAuthToken = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
  };

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register setToken={setAuthToken} />} />
        <Route path="/login" element={<Login setToken={setAuthToken} />} />
        <Route
          path="/todos"
          element={token ? <TodoList token={token} /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/todos" />} />
      </Routes>
    </Router>
  );
};

export default App;
