import React from 'react'
import Login from './Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './Signup';
import Home from './Home';
import CreateOpportunity from './CreateOpportunity';
import CreateTeam from './CreateTeam';

function App() {
  return (
    <div>
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
            <Route path='/home' element={<Home />}></Route>
            <Route path='/create-opportunity' element={<CreateOpportunity />}></Route>
            <Route path='/create-team' element={<CreateTeam />}></Route>

          </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App