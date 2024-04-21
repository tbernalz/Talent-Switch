import React from 'react'
import Login from './register/Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './register/Signup';
import Home from './profile/Home';

import CreateOpportunity from './functions/CreateOpportunity';
import ListOpportunities from './functions/ListOpportunities';
import OpportunityDetail from './functions/OpportunityDetail';

import CreateTeam from './functions/CreateTeam';
import ListTeams from './functions/ListTeams';

function App() {
  return (
    <div>
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
            <Route path='/home' element={<Home />}></Route>

            {/* Opportunities */}
            <Route path='/create-opportunity' element={<CreateOpportunity />}></Route>
            <Route path='/list-opportunities' element={<ListOpportunities />}></Route>
            <Route path='/opportunities/:id' element={<OpportunityDetail />}></Route>


            {/* Teams Project */}
            <Route path='/create-team' element={<CreateTeam />}></Route>
            <Route path='/list-teams' element={<ListTeams />}></Route>

          </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App