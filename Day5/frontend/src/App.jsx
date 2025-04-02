import React from 'react'
import Register from './components/Register'
import View from './components/view'
import Delete from './components/Delete'
import Update from './components/Update'
import './App.css'
const App = () => {
  return (
    <div>
      <h1>User Registration Form</h1>
      <Register/>
      <Update/>
      <Delete/>
      <View/>
    </div>
  )
}

export default App