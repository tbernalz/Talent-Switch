import React from 'react'

import {BrowserRouter, Routes, Route} from 'react-router-dom'

//Register
import Login from './register/Login'
import Signup from './register/Signup';

//Profile
import Home from './profile/Home';

//Opportunity
import CreateOpportunity from './functions/CreateOpportunity';
import ListOpportunities from './functions/ListOpportunities';
import OpportunityDetail from './functions/OpportunityDetail';
import ListApplicants from './functions/ListApplicants'

//Team
import CreateTeam from './functions/CreateTeam';
import ListTeams from './functions/ListTeams';
import TeamDetail from './functions/TeamDetail';
import ListMembers from './functions/ListMembers'

//Postulation
import CreatePostulation from './functions/CreatePotulation';
import ListPostulations from './functions/ListPostulations';
import PostulationDetail from './functions/PostulationDetail';

//Evaluation
import EvaluationForm from './functions/EvaluationForm';

//Profile Functions
import UpdateProfile from './profile/UpdateProfile';
import MyProfile from './profile/MyProfile';

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
            <Route path='/opportunities/:id/list-applicants' element={<ListApplicants />}></Route>

            {/* Teams Project */}
            <Route path='/create-team' element={<CreateTeam />}></Route>
            <Route path='/list-teams' element={<ListTeams />}></Route>
            <Route path='/teams/:id' element={<TeamDetail />}></Route>
            <Route path='/teams/:id/list-members' element={<ListMembers />}></Route>

            {/* Postulations */}
            <Route path='/create-postulation' element={<CreatePostulation />}></Route>
            <Route path='/list-postulations' element={<ListPostulations />}></Route>
            <Route path='/postulations/:id' element={<PostulationDetail />}></Route>

            {/* Evaluation */}
            <Route path='/evaluation-form' element={<EvaluationForm />}></Route>

            {/* Profile Funtions */}
            <Route path='/my-profile' element={<MyProfile />}></Route>
            <Route path='/update-profile' element={<UpdateProfile />}></Route>

          </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App