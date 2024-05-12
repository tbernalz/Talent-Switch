import React from 'react'

import {BrowserRouter, Routes, Route} from 'react-router-dom'

//auth
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';

//profile
import Home from './components/profile/Home';
import UpdateProfile from './components/profile/UpdateProfile';
import MyProfile from './components/profile/MyProfile';

//Opportunity
import CreateOpportunity from './components/opportunity/CreateOpportunity';
import ListOpportunities from './components/opportunity/ListOpportunities';
import OpportunityDetail from './components/opportunity/OpportunityDetail';
import ListApplicants from './components/opportunity/ListApplicants';

//Team
import CreateTeam from './components/team/CreateTeam';
import ListTeams from './components/team/ListTeams';
import TeamDetail from './components/team/TeamDetail';
import ListMembers from './components/team/ListMembers'

//Postulation
import CreatePostulation from './components/postulation/CreatePostulation';
import ListPostulations from'./components/postulation/ListPostulations';
import PostulationDetail from './components/postulation/PostulationDetail';

//Evaluation
import Evaluate from './components/team/Evaluate';

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
            <Route path='/evaluate-member/:id/:user_id/:member_email' element={<Evaluate />} />

            {/* Profile Funtions */}
            <Route path='/my-profile' element={<MyProfile />}></Route>
            <Route path='/update-profile' element={<UpdateProfile />}></Route>

          </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App