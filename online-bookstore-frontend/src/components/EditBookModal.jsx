import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Form.css'; // Assuming you have some CSS for styling
const EditBookModal = ({ book, categories, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    price: '',
    categoryId: ''
  });

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title || '',
        author: book.author || '',
        price: book.price || '',
        categoryId: book.categoryId || ''
      });
    }
  }, [book]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...book, ...formData });
    onClose(); // close after saving
  };
  const handleSave = async () => {
    if (!formData.title || !formData.author || !formData.price || !formData.categoryId) {
      alert("Please fill in all fields before saving.");
      return;
    }
  
    try {
      await axios.put(`http://localhost:8082/books/${editingBook.id}`, formData);
      onSave(); // refresh
      onClose(); // close modal
    } catch (error) {
      alert("❌ Failed to update book.");
    }
  };
  
  if (!book) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 shadow-xl w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Edit Book</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full border border-gray-300 p-2 rounded"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            required
          />

          <input
            className="w-full border border-gray-300 p-2 rounded"
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Author"
            required
          />

          <input
            className="w-full border border-gray-300 p-2 rounded"
            type="number"
            step="0.01"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            required
          />

          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          >
            <option value="">Select Category</option>
            {categories?.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBookModal;
