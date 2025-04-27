import React from 'react'
import axios from 'axios'

const Delete = () => {
    const handleDelete = async (e) => {
        e.preventDefault()
        const id = e.target.id.value
        await axios.delete(`https://fsdbackend-191o.onrender.com/users/${id}`)
        alert('User deleted successfully')
      }
  return (
    <div>
        <h1>Delete User</h1>
        <form onSubmit={handleDelete}>
            <label>User ID:</label><input type="number" placeholder='Enter User ID' name="id" /> <br/>
            <br/>
            <button type='submit'>Delete</button>
        </form>
    </div>
  )
}

export default Delete