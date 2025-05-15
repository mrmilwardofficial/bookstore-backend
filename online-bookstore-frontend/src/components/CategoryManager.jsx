import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/categories`);
      setCategories(res.data);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/categories`, { name });
      setName('');
      fetchCategories();
    } catch (err) {
      console.error('Error adding category:', err);
    }
  };

  return (
    <div>
      <h3>Categories</h3>
      <ul>
        {categories.map((cat) => (
          <li key={cat.id}>{cat.name}</li>
        ))}
      </ul>
      <form onSubmit={handleAddCategory}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New Category"
          required
        />
        <button type="submit">Add Category</button>
      </form>
    </div>
  );
};

export default CategoryManager;
