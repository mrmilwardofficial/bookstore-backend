import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [message, setMessage] = useState('');

  const fetchCategories = () => {
    axios.get('http://localhost:8082/categories')
      .then(res => setCategories(res.data))
      .catch(() => setMessage("❌ Failed to fetch categories"));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8082/categories', { name: newCategory });
      setMessage('✅ Category added!');
      setNewCategory('');
      fetchCategories();
    } catch {
      setMessage('❌ Failed to add category');
    }
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>Manage Categories</h2>
      {message && <p>{message}</p>}

      <form onSubmit={handleAdd} style={{ display: 'flex', gap: '0.5rem' }}>
        <input
          type="text"
          placeholder="New Category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          required
        />
        <button type="submit">Add</button>
      </form>

      <ul style={{ marginTop: '1rem' }}>
        {categories.map(cat => (
          <li key={cat.id}>{cat.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryManager;
