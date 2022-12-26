import React from 'react'
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Fetch from './compo/Fetch'
import Register from './compo/Register'
import Nav from './Nav'
import Update from "./compo/Update"
import Login from './compo/Login'
import PrivateComponent from './compo/PrivateComponent'
function App() {
  return (
    <>
    <BrowserRouter>
    <Nav/>
    <Routes>
      <Route element={<PrivateComponent/>}>
        <Route path='/fetchAll' element={<Fetch/>}></Route>
        <Route path='/update/:id' element={<Update/>}></Route>
      </Route>
      <Route path='/' element={<h1>Home</h1>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      
    </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App