import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './page/Home'
import Header from './components/Header'

const App = () => {
  return (
   
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path='/' element={<Header/>}/>
   </Routes>
  )
}

export default App