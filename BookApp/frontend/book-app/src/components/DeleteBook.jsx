import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DeleteBook = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get('http://localhost:9000/books');
      setBooks(res.data);
      setError(null);
    } catch (error) {
      console.error(error);
      setError('Failed to fetch books');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this book?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:9000/books/${id}`);
      alert('Book deleted successfully');
      fetchBooks();
    } catch (error) {
      console.error(error);
      alert('Error deleting book');
    }
  };

  const getBookImageUrl = (book) => {
    if (book.image) return book.image;
    if (book.imageUrl) return book.imageUrl;
    if (book.coverId || book.cover_id) {
      const coverId = book.coverId || book.cover_id;
      return `http://localhost:9000/books/covers/${coverId}`;
    }
    const bookId = book._id || book.id;
    return `http://localhost:9000/books/${bookId}/cover`;
  };

  if (isLoading) return <div className="loading">Loading books...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="delete-books-container">
      <h1 className="page-title">Delete Book</h1>

      {books.length === 0 ? (
        <p className="no-books">No books available</p>
      ) : (
        <div className="book-grid">
          {books.map((book) => (
            <div key={book._id || book.id} className="book-card">
              <div className="book-image-container">
                <img
                  src={getBookImageUrl(book)}
                  alt={`Cover of ${book.title}`}
                  className="book-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.parentNode.classList.add('fallback-cover');
                    e.target.style.display = 'none';
                    const initials = document.createElement('span');
                    initials.innerText = `${book.title?.charAt(0) || ''}${book.author?.charAt(0) || ''}`;
                    e.target.parentNode.appendChild(initials);
                  }}
                />
              </div>
              <div className="book-info">
                <h3 className="book-title">{book.title}</h3>
                <p className="book-author">by {book.author}</p>
              </div>
              <button
                className="delete-btn"
                onClick={() => handleDelete(book._id || book.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {/* CSS STYLES */}
      <style jsx>{`
        .delete-books-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
        }

        .page-title {
          color: #333;
          margin: 30px 0;
          text-align: center;
          font-size: 32px;
          font-weight: bold;
        }

        .book-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 30px;
          justify-content: center;
          padding: 20px 0;
        }

        .book-card {
          display: flex;
          flex-direction: column;
          width: 280px;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.4s ease, box-shadow 0.4s ease;
          background-color: white;
          position: relative;
        }

        .book-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }

        .book-image-container {
          background-color: #f5f5f5;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          padding: 20px;
        }

        .book-cover {
          width: 100%;
          height: auto;
          max-height: 400px;
          object-fit: contain;
          transition: transform 0.4s ease;
        }

        .book-image-container:hover .book-cover {
          transform: scale(1.05);
        }

        .fallback-cover {
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #006e74 0%, #00877a 100%);
          color: white;
          font-size: 48px;
          font-weight: bold;
          height: 300px;
        }

        .book-info {
          padding: 12px 10px;
          text-align: center;
        }

        .book-title {
          margin: 0 0 8px 0;
          font-size: 18px;
          color: #333;
          line-height: 1.3;
        }

        .book-author {
          margin: 0;
          color: #666;
          font-style: italic;
          font-size: 14px;
        }

        .delete-btn {
          background-color: #006e74;
          color: white;
          border: none;
          padding: 12px 0;
          cursor: pointer;
          transition: background-color 0.3s;
          font-weight: bold;
          text-transform: uppercase;
          font-size: 14px;
          letter-spacing: 0.5px;
          width: 100%;
        }

        .delete-btn:hover {
          background-color: #005057;
        }

        .loading, .error, .no-books {
          text-align: center;
          padding: 40px;
          color: #666;
          font-size: 18px;
        }

        .error {
          color: #e60000;
        }

        @media (max-width: 768px) {
          .book-grid {
            gap: 20px;
          }

          .book-card {
            width: calc(50% - 20px);
            min-width: 220px;
          }
        }

        @media (max-width: 480px) {
          .book-card {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default DeleteBook;
