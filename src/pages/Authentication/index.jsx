import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Login.jsx'  
import Register from './Register.jsx'
export default function index() {
  return (
    <Routes>
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
    </Routes>
  )
}
