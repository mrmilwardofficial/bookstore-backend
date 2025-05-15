import React, { useState, useEffect } from 'react';
import BookList from './components/BookList';
import AddBookForm from './components/AddBookForm';
import axios from 'axios';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  function App() {
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-5xl mx-auto bg-white p-6 rounded-2xl shadow-md">
          <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">📚 Online Bookstore</h1>
          <AddBookForm />
          <hr className="my-6" />
          <BookList />
        </div>
      </div>
    );
  }
  
  const [books, setBooks] = useState([]);

  const fetchBooks = () => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/books`)
      .then(res => setBooks(res.data))
      .catch(err => console.error('Failed to fetch books:', err));
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>📚 Online Bookstore</h1>
      <AddBookForm onBookAdded={fetchBooks} />
      <hr />
      <BookList books={books} refreshBooks={fetchBooks} />
    </div>
  );
}

export default App;
