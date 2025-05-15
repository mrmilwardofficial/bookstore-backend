import React from 'react';
import BookList from './components/BookList';
import AddBookForm from './components/AddBookForm';
import CategoryManager from './components/CategoryManager';
import './App.css';

const App = () => {
  const [refreshFlag, setRefreshFlag] = React.useState(false);

  const triggerRefresh = () => {
    setRefreshFlag(!refreshFlag);
  };

  return (
    <div className="app">
      <h1>Online Bookstore</h1>
      <AddBookForm onBookAdded={triggerRefresh} />
      <BookList key={refreshFlag} />
      <CategoryManager />
    </div>
  );
};

export default App;
