import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewBook = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:9000/books');
        if (response.data && Array.isArray(response.data)) {
          setBooks(response.data);
        } else {
          setError('Invalid data format received from server.');
        }
      } catch (err) {
        setError('Failed to fetch books. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div style={{ padding: '40px', backgroundColor: '#f7f9fb', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', color: '#06202B', marginBottom: '40px' }}>📚 View Book Details</h1>
      {loading && <p style={{ textAlign: 'center' }}>Loading books...</p>}
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'center' }}>
        {books.map((book) => (
          <div
            key={book.id || book._id}
            style={{
              backgroundColor: '#ffffff',
              width: '260px',
              borderRadius: '16px',
              padding: '20px',
              boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.boxShadow = '0 16px 32px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
            }}
          >
            {book.image && (
              <img
                src={book.image}
                alt={book.title}
                style={{
                  width: '160px',
                  height: '220px',
                  objectFit: 'cover',
                  borderRadius: '10px',
                  marginBottom: '15px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                }}
                onError={(e) => (e.target.style.display = 'none')}
              />
            )}
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#077A7D', textAlign: 'center', marginBottom: '10px' }}>
              {book.title}
            </h3>
            <p style={{ margin: '6px 0', color: '#333' }}>
              <strong>Author:</strong> {book.author}
            </p>
            <p style={{ margin: '6px 0', color: '#333' }}>
              <strong>Published:</strong>{' '}
              {book.date && !isNaN(Date.parse(book.date))
                ? new Date(book.date).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                : 'Not available'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewBook;
