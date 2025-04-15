import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Form.css';
import { toast } from 'react-toastify';

const AddBookForm = () => {
  const [book, setBook] = useState({
    title: '',
    author: '',
    price: '',
    categoryId: ''
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8082/categories')
      .then(res => setCategories(res.data))
      .catch(err => {
        console.error("Error loading categories:", err);
        setCategories([]);
      });
  }, []);

  const handleChange = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!book.title || !book.author || !book.price || !book.categoryId) {
      alert("Please fill in all the fields.");
      return;
    }
  
    try {
      await axios.post(`http://localhost:8082/books`, book);
      alert("✅ Book added successfully!");
      setBook({ title: '', author: '', price: '', categoryId: '' });
    } catch (err) {
      console.error("Failed to add book:", err);
      alert("❌ Failed to add book. Please try again.");
  }
    const { title, author, price, categoryId } = book;
    if (!title || !author || !price || !categoryId) {
      alert("⚠️ Please fill in all fields.");
      return;
    }

    try {
      await axios.post('http://localhost:8082/books', book);
      toast.success("✅ Book added successfully!");
      setBook({ title: '', author: '', price: '', categoryId: '' });
    } catch (err) {
      toast.error("❌ Failed to add book");
    }
    
  };

  return (
    <form className="add-book-form" onSubmit={handleSubmit}>
// Removed redundant try-catch block

      <h2>Add a New Book</h2>

      <input
        type="text"
        name="title"
        placeholder="Title"
        value={book.title}
        onChange={handleChange}
        required
        minLength={2}
      /><br />

      <input
        type="text"
        name="author"
        placeholder="Author"
        value={book.author}
        onChange={handleChange}
        required
      /><br />

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={book.price}
        onChange={handleChange}
        required
        min={1}
        step="0.01"
      /><br />

      <select
        name="categoryId"
        value={book.categoryId}
        onChange={handleChange}
        required
      >
        <option value="">-- Select Category --</option>
        {categories.map(cat => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select><br /><br />

      <button type="submit">Add Book</button>
    </form>
  );
};

export default AddBookForm;
