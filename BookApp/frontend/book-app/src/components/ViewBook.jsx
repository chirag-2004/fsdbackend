import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewBook = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    handleview();
  }, []);

  const handleview = async () => {
    try {
      const res = await axios.get('https://fsdbackend-2-5qmu.onrender.com/books');
      setBooks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>View Book Details</h1>
      <div
        style={{
          display: 'grid', // Grid layout for better alignment
          gridTemplateColumns: books.length === 1 ? '1fr' : books.length === 2 ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(250px, 1fr))', // Adjust columns dynamically
          gap: '30px',
          justifyContent: 'center', // Center align the grid
          alignItems: 'flex-start',
          padding: '20px',
        }}
      >
        {books.map((book) => (
          <div
            key={book._id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              border: '1px solid #ccc',
              borderRadius: '12px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              padding: '15px',
              backgroundColor: '#fff',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
            }}
          >
            <img
              src={book.image}
              alt={book.title}
              style={{
                width: '100%',
                height: 'auto', // Ensure the image is not cropped
                maxHeight: '300px', // Limit the height for consistency
                objectFit: 'contain', // Ensure the entire image is visible
                borderRadius: '8px',
                marginBottom: '15px',
              }}
            />
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px', color: '#333' }}>
              {book.title}
            </h3>
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
              <strong>Author:</strong> {book.author}
            </p>
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
              <strong>Date:</strong> {book.date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewBook;