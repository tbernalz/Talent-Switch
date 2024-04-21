import React from 'react'
import Login from './register/Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './register/Signup';
import Home from './profile/Home';

//Opportunity
import CreateOpportunity from './functions/CreateOpportunity';
import ListOpportunities from './functions/ListOpportunities';
import OpportunityDetail from './functions/OpportunityDetail';

//Team
import CreateTeam from './functions/CreateTeam';
import ListTeams from './functions/ListTeams';

//Postulation
import CreatePostulation from './functions/CreatePotulation';
import ListPostulations from './functions/ListPostulations';

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
            {/* <Route path='/teams/:id' element={<TeamDetail />}></Route> */}

            {/* Opportunities */}
            <Route path='/create-postulation' element={<CreatePostulation />}></Route>
            <Route path='/list-postulations' element={<ListPostulations />}></Route>
            {/* <Route path='/postulations/:id' element={<PostulationDetail />}></Route> */}

          </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App