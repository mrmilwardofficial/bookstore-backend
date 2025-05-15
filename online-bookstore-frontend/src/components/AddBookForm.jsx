import React, { useState } from 'react';
import axios from 'axios';
import './Form.css';

const AddBookForm = ({ onBookAdded }) => {
  const [book, setBook] = useState({ title: '', author: '', price: '', category: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newBook = {
        ...book,
        price: parseFloat(book.price),
        category: { name: book.category },
      };
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/books`, newBook);
      onBookAdded();
      setBook({ title: '', author: '', price: '', category: '' });
    } catch (err) {
      console.error('Error adding book:', err);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input name="title" value={book.title} onChange={handleChange} placeholder="Title" required />
      <input name="author" value={book.author} onChange={handleChange} placeholder="Author" required />
      <input name="price" value={book.price} onChange={handleChange} placeholder="Price" required />
      <input name="category" value={book.category} onChange={handleChange} placeholder="Category" required />
      <button type="submit">Add Book</button>
    </form>
  );
};

export default AddBookForm;
