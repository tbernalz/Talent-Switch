import React from 'react'
import Login from './register/Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './register/Signup';
import Home from './profile/Home';
import CreateOpportunity from './functions/CreateOpportunity';
import CreateTeam from './functions/CreateTeam';

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