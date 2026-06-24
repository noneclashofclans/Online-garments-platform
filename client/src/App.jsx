import React from 'react'
import {Route, Routes} from "react-router-dom"
import Landing from './pages/Landing'
import Dresses from './pages/Dresses'
import DressesInfo from './pages/DressesInfo'
import Login from './pages/Login'
import Register from './pages/Register'
import Cart from './pages/Cart'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Landing />}></Route>
      <Route path='/dresses' element={<Dresses />}></Route>
      <Route path='/dresses-info' element={<DressesInfo />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/register' element={<Register />}></Route>
      <Route path='/cart' element={<Cart />}></Route>
    </Routes>
  )
}

export default App
