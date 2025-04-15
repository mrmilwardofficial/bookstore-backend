import React from 'react';
import BookList from './components/BookList';
import AddBookForm from './components/AddBookForm';
import CategoryList from './components/CategoryList';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>📖 Online Bookstore</h1>
      <CategoryList />
      <AddBookForm />
      <hr />
      <BookList />
    </div>
  );
}

export default App;
