import React from 'react'
import Login from './components/auth/Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './components/auth/Signup';
import Home from './components/profile/Home';

//Opportunity
import CreateOpportunity from './components/opportunity/CreateOpportunity';
import ListOpportunities from './components/opportunity/ListOpportunities';
import OpportunityDetail from './components/opportunity/OpportunityDetail';

//Team
import CreateTeam from './components/team/CreateTeam';
import ListTeams from './components/team/ListTeams';
import TeamDetail from './components/team/TeamDetail';

//Postulation
import CreatePostulation from './components/postulation/CreatePostulation';
import ListPostulations from'./components/postulation/ListPostulations';
import PostulationDetail from './components/postulation/PostulationDetail';

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
            <Route path='/teams/:id' element={<TeamDetail />}></Route>

            {/* Opportunities */}
            <Route path='/create-postulation' element={<CreatePostulation />}></Route>
            <Route path='/list-postulations' element={<ListPostulations />}></Route>
            <Route path='/postulations/:id' element={<PostulationDetail />}></Route>

          </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App