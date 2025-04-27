import React, { useState } from 'react';
import axios from 'axios';

const SearchBook = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!query) {
      alert('Please enter a title to search');
      return;
    }

    try {
      const res = await axios.get(`http://localhost:9000/search?title=${query}`);
      setBooks(res.data);
      setSearched(true);
    } catch (error) {
      console.error(error);
      alert('Error while fetching books');
    }
  };

  return (
    <div style={{ padding: '40px', backgroundColor: '#f4f7f9', minHeight: '100vh' }}>
      <h2 style={{ textAlign: 'center', color: '#06202B', marginBottom: '20px' }}>🔍 Search Books</h2>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '30px' }}>
        <input
          type="text"
          placeholder="Enter book title"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            padding: '10px',
            width: '300px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '16px',
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: '10px 20px',
            backgroundColor: '#077A7D',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          Search
        </button>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {searched && books.length === 0 ? (
          <p style={{ color: '#555' }}>No books found.</p>
        ) : (
          books.map((book) => (
            <div
              key={book._id}
              style={{
                width: '220px',
                backgroundColor: '#fff',
                borderRadius: '12px',
                padding: '15px',
                boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                textAlign: 'center',
                transition: 'transform 0.3s',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <img
                src={book.image}
                alt={book.title}
                width="150"
                height="200"
                style={{ objectFit: 'cover', borderRadius: '8px', marginBottom: '10px' }}
                onError={(e) => (e.target.style.display = 'none')}
              />
              <h4 style={{ color: '#077A7D', marginBottom: '8px' }}>{book.title}</h4>
              <p style={{ color: '#333', fontSize: '14px' }}><strong>Author:</strong> {book.author}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchBook;
