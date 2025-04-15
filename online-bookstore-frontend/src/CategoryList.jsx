import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CategoryList = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8082/categories')
      .then(res => {
        setCategories(res.data);
      })
      .catch(err => {
        console.error("Failed to fetch categories:", err);
      });
  }, []);

  return (
    <div>
      <h2>Categories</h2>
      <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
        {categories.map(cat => (
          <li key={cat.id}>
            <button
              onClick={() => onSelectCategory(cat.id)}
              style={{ marginBottom: '10px', width: '100%' }}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
