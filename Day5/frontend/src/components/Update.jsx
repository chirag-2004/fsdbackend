import React from 'react'
import axios from 'axios'

const Update = () => {
    const handleUpdate = async (e) => {
        e.preventDefault()
        const id = e.target.id.value
        const user = {
            name: e.target.name.value,
            age: e.target.age.value
        }
        await axios.put(`https://fsdbackend-191o.onrender.com/users/${id}`, user)
        alert('User updated successfully')
      }
  return (
    <div>
        <h1>Update User</h1>
        <form onSubmit={handleUpdate}>
            <label>User ID:</label><input type="number" name="id" /> <br/><br/>
            <label>Name:</label><input type="text" name="name" /> <br/><br/>
            <label>Age:</label><input type="number" name="age"/> <br/><br/>
            <button type='submit'>Update</button>
        </form>
    </div>
  )
}

export default Update