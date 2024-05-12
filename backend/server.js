const express = require('express');
const cors = require('cors');
// APIs
const applicantRoutes = require('./routes/api/applicant');
const authRoutes = require('./routes/api/auth');
const evaluationRoutes = require('./routes/api/evaluation');
const memberRoutes = require('./routes/api/member');
const opportunityRoutes = require('./routes/api/opportunity');
const postulationRoutes = require('./routes/api/postulation');
const teamRoutes = require('./routes/api/team');


const app = express();
app.use(cors());
app.use(express.json());

app.use('/', applicantRoutes); // /api/applicant
app.use('/', authRoutes); // /api/auth
app.use('/', evaluationRoutes); // /api/evaluation
app.use('/', memberRoutes); // /api/member
app.use('/', opportunityRoutes); // /api/opportunity
app.use('/', postulationRoutes); // /api/postulation
app.use('/', teamRoutes); // /api/team

app.listen(8081, () => {
    console.log("Listening")
});