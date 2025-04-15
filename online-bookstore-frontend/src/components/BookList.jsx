
// BookList.jsx - Final Polished Version
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditBookModal from './EditBookModal';
import './BookList.css'; // Assuming you have some CSS for styling
import { toast } from 'react-toastify';
const BookList = () => {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('title');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get('http://localhost:8082/books');
      setBooks(res.data);
    } catch (err) {
      console.error('Failed to fetch books:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8082/books/${id}`);
      fetchBooks();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleEditSave = async (updatedBook) => {
    try {
      await axios.put(`http://localhost:8082/books/${updatedBook.id}`, updatedBook);
      setEditingBook(null);
      fetchBooks();
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    const valA = a[sortBy]?.toString().toLowerCase();
    const valB = b[sortBy]?.toString().toLowerCase();
    return valA > valB ? 1 : -1;
  });

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="price">Price</option>
        </select>
      </div>

      {sortedBooks.map((book) => (
        <div key={book.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <h3>{book.title}</h3>
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Price:</strong> ${book.price}</p>
          <p><strong>Category:</strong> {book.category?.name || 'N/A'}</p>
          <button onClick={() => setEditingBook(book)}>Edit</button>
          <button onClick={() => handleDelete(book.id)}>Delete</button>
        </div>
      ))}

      {editingBook && (
        <EditBookModal
          editingBook={editingBook}
          onClose={() => setEditingBook(null)}
          onSave={handleEditSave}
        />
      )}
    </div>
  );
};

export default BookList;