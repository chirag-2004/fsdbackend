import React from 'react'
import axios from 'axios'
const AddBook = () => {
    const handlebook=async (e)=>{
        e.preventDefault();
        const title=e.target.title.value;
        const author=e.target.author.value;
        const date=e.target.date.value;
        const image=e.target.image.value;
        const books={title,author,date,image}
        await axios.post('https://fsdbackend-2-5qmu.onrender.com/books',books);
        alert('Book Added Successfully')
    }
  return (
    <div>
      <h1>Add Book</h1>
      <form onSubmit={handlebook}>
        Title: <input type='text' name='title' required />
        Author: <input type='text' name='author' required />
        Date: <input type='date' name='date' required />
        Image: <input type='text' name='image' required />
        <br />
        <br /> {/* Added extra space above the button */}
        <button type='submit' style={{ marginBottom: '120px' }}>Add Book</button> {/* Added margin below the button */}
      </form>
    </div>
  )
}

export default AddBook