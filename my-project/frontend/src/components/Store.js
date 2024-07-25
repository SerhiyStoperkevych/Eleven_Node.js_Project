import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Store = () => {
  const [all, setAll] = useState([]);
  const [cart, setCart] = useState([]);
  const [sorting, setSorting] = useState('');
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/menu/store');
        setAll(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
        // Optional: Add user feedback for the error
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    const sortItems = () => {
      if (sorting === '') return; // No sorting if sorting is empty

      const arrange = [...all];

      switch (sorting) {
        case 'cost':
          arrange.sort((a, b) => b.cost - a.cost);
          break;
        case 'az':
          arrange.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'za':
          arrange.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case 'id+':
          arrange.sort((a, b) => a.id - b.id);
          break;
        case 'id-':
          arrange.sort((a, b) => b.id - a.id);
          break;
        default:
          break;
      }

      setAll(arrange);
    };

    sortItems();
  }, [sorting]); // Only depend on sorting

  const addItem = (item) => {
    setCart(prevCart => [...prevCart, item]);
    setTotal(prevTotal => prevTotal + item.cost);
  };

  const removeCart = (itemId) => {
    const itemToRemove = cart.find(item => item.id === itemId);
    if (itemToRemove) {
      setCart(cart.filter(item => item.id !== itemId));
      setTotal(prevTotal => prevTotal - itemToRemove.cost);
    }
  };

  const handleChange = (e) => {
    setSorting(e.target.value);
  };

  return (
    <div>
      <button onClick={() => navigate('/menu')}>Go Back</button>
      <h1>Items</h1>
      <select value={sorting} onChange={handleChange}>
        <option value=''>Choose</option>
        <option value='cost'>Cost</option>
        <option value='az'>A-Z</option>
        <option value='za'>Z-A</option>
        <option value='id+'>ID+</option>
        <option value='id-'>ID-</option>
      </select>
      <ul>
        {all.map((item) => (
          <li key={item.id}>
            <h2>{item.name}</h2>
            <p>${item.cost}</p>
            <button onClick={() => addItem(item)}>Add to Cart</button>
          </li>
        ))}
      </ul>

      <h1>Cart:</h1>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            <h2>{item.name}</h2>
            <p>${item.cost}</p>
            <button onClick={() => removeCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <h2>Total: ${total}</h2>
    </div>
  );
};

export default Store;
