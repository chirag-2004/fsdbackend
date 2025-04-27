import React from 'react'
import Register from './components/Register'

import Delete from './components/Delete'
import Update from './components/Update'
import './App.css'
import View1 from './components/View1'
const App = () => {
  return (
    <div>
      <h1>USER REGISTRATION SYSTEM</h1>
      <Register/>
      <Update/>
      <Delete/>
      <View1/>
    </div>
  )
}

export default App