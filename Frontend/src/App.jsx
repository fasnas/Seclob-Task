import React from 'react'
import {BrowserRouter as Router,Routes,Route}from "react-router-dom"
import Singup from './Components/Singup'
import Login from './Components/Login'
import ProductListingPage from './Components/Home'


const App = () => {
  return (
    <div>
      <Router>
        <Routes>
        <Route path='/' element={<Singup/>}/> 
        <Route path='/login' element={<Login/>}/> 
        <Route path='/home' element={<ProductListingPage/>}/> 
        </Routes>
      </Router>
      
    </div>
  )
}

export default App

