import React, { useState } from 'react';

const BookList = ({ books = [], onEdit = () => {}, onDelete = () => {} }) => {
  const [editingBookId, setEditingBookId] = useState(null);
  const [editedBook, setEditedBook] = useState({});

  const startEditing = (book) => {
    setEditingBookId(book.id);
    setEditedBook(book);
  };

  const cancelEditing = () => {
    setEditingBookId(null);
    setEditedBook({});
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedBook((prev) => ({ ...prev, [name]: value }));
  };

  const saveEdit = () => {
    onEdit(editedBook);
    cancelEditing();
  };

  if (!books.length) {
    return <p>No books available.</p>;
  }

  return (
    <div>
      <h2>Book List</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {books.map((book) => (
          <li key={book.id} style={{ marginBottom: '1rem' }}>
            {editingBookId === book.id ? (
              <div>
                <input
                  name="title"
                  value={editedBook.title}
                  onChange={handleEditChange}
                />
                <input
                  name="author"
                  value={editedBook.author}
                  onChange={handleEditChange}
                />
                <input
                  name="price"
                  type="number"
                  value={editedBook.price}
                  onChange={handleEditChange}
                />
                <button onClick={saveEdit}>Save</button>
                <button onClick={cancelEditing}>Cancel</button>
              </div>
            ) : (
              <div>
                <strong>{book.title}</strong> by {book.author} – ${book.price}
                <button onClick={() => startEditing(book)}>Edit</button>
                <button onClick={() => onDelete(book.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
