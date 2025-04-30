import React, { useState } from 'react';
import axios from 'axios';

const UpdateBook = () => {
  const [bookName, setBookName] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedBook({ ...selectedBook, [name]: value });
  };

  const handleSearch = async () => {
    if (!bookName.trim()) {
      setMessage('Please enter a book name to search');
      setMessageType('error');
      return;
    }

    try {
      const { data } = await axios.get(`https://fsdbackend-2-5qmu.onrender.com/search?title=${encodeURIComponent(bookName)}`);
      if (data.length > 0) {
        setSearchResults(data);
        setMessage(`${data.length} book(s) found. Please select one to update.`);
        setMessageType('success');
      } else {
        setMessage('No books found with the given name');
        setMessageType('error');
        setSearchResults([]);
        setSelectedBook(null);
      }
    } catch (error) {
      console.error(error);
      setMessage('Error searching for the book. Please try again.');
      setMessageType('error');
    }
  };

  const handleSelectBook = (book) => {
    setSelectedBook(book);
    setMessage('');
    setMessageType('');
  };

  const handleUpdate = async () => {
    if (!selectedBook) {
      setMessage('No book selected to update');
      setMessageType('error');
      return;
    }

    try {
      await axios.put(`https://fsdbackend-2-5qmu.onrender.com/books/${selectedBook._id}`, selectedBook);
      setMessage('Book updated successfully');
      setMessageType('success');
      setBookName('');
      setSearchResults([]);
      setSelectedBook(null);
    } catch (error) {
      console.error(error);
      setMessage('Failed to update the book. Please try again.');
      setMessageType('error');
    }
  };

  return (
    <div className="update-book-container" style={{ padding: '20px', textAlign: 'center' }}>
      <h1 className="page-title" style={{ marginBottom: '20px' }}>Update Book Details</h1>
      <div className="form-container">
        <div className="search-section" style={{ marginBottom: '15px' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Book Name"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
            style={{ padding: '8px', width: '250px', marginRight: '8px' }}
          />
          <button className="search-btn" onClick={handleSearch} style={{ padding: '8px 16px' }}>
            Search
          </button>
        </div>
        {searchResults.length > 0 && (
          <div className="search-results" style={{ marginBottom: '15px' }}>
            <h3 style={{ marginBottom: '10px' }}>Search Results:</h3>
            {searchResults.map((book) => (
              <div
                key={book._id}
                className="book-card"
                style={{
                  display: 'inline-block',
                  width: '220px',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  padding: '10px',
                  textAlign: 'center',
                  boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
                  margin: '10px',
                  cursor: 'pointer',
                }}
                onClick={() => handleSelectBook(book)}
              >
                <img
                  src={book.image}
                  alt={book.title}
                  style={{
                    width: '100%',
                    height: '250px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    marginBottom: '10px',
                  }}
                />
                <h2 style={{ fontSize: '16px', marginBottom: '8px' }}>{book.title}</h2>
                <p style={{ marginBottom: '5px', fontSize: '14px' }}><strong>Author:</strong> {book.author}</p>
                <p style={{ marginBottom: '10px', fontSize: '14px' }}><strong>Date:</strong> {book.date}</p>
              </div>
            ))}
          </div>
        )}
        {selectedBook && (
          <div
            className="book-card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '350px',
              border: '1px solid #ccc',
              borderRadius: '12px',
              padding: '20px',
              textAlign: 'center',
              boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
              margin: '20px auto',
              backgroundColor: '#fff',
            }}
          >
            <h3 style={{ marginBottom: '15px', fontSize: '18px', fontWeight: 'bold', color: '#077A7D' }}>
              Update Fields
            </h3>
            <input
              type="text"
              name="title"
              className="form-control"
              placeholder="Title"
              value={selectedBook.title}
              onChange={handleInputChange}
              style={{
                marginBottom: '12px',
                padding: '10px',
                width: '100%',
                borderRadius: '8px',
                border: '1px solid #ccc',
                fontSize: '14px',
              }}
            />
            <input
              type="text"
              name="author"
              className="form-control"
              placeholder="Author"
              value={selectedBook.author}
              onChange={handleInputChange}
              style={{
                marginBottom: '12px',
                padding: '10px',
                width: '100%',
                borderRadius: '8px',
                border: '1px solid #ccc',
                fontSize: '14px',
              }}
            />
            <input
              type="date"
              name="date"
              className="form-control"
              value={selectedBook.date}
              onChange={handleInputChange}
              style={{
                marginBottom: '12px',
                padding: '10px',
                width: '100%',
                borderRadius: '8px',
                border: '1px solid #ccc',
                fontSize: '14px',
              }}
            />
            <input
              type="text"
              name="image"
              className="form-control"
              placeholder="Image URL"
              value={selectedBook.image}
              onChange={handleInputChange}
              style={{
                marginBottom: '12px',
                padding: '10px',
                width: '100%',
                borderRadius: '8px',
                border: '1px solid #ccc',
                fontSize: '14px',
              }}
            />
            <button
              className="update-btn"
              onClick={handleUpdate}
              style={{
                padding: '12px 20px',
                backgroundColor: '#077A7D',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
                }}
            >
              Update Book
            </button>
          </div>
        )}
        {message && <div className={`message ${messageType}`} style={{ marginTop: '15px', fontSize: '14px' }}>{message}</div>}
      </div>
    </div>
  );
};

export default UpdateBook;
