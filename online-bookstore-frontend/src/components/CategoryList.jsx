import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:8082/categories');
      setCategories(res.data);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      await axios.post('http://localhost:8082/categories', { name });
      setName('');
      fetchCategories(); // refresh
    } catch (err) {
      console.error("Failed to add category:", err);
    }
  };

  return (
    <div style={{ marginBottom: '2rem' }}>
      <h3>📚 Categories</h3>
      <ul>
        {categories.map(cat => (
          <li key={cat.id}>{cat.name}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Add new category"
          required
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default CategoryList;
