const express = require('express');
const cors = require('cors');
const session = require('express-session');
const { sessionStore } = require('./config/db'); // Importar la configuración del almacén de sesiones

// APIs
const applicantRoutes = require('./routes/api/applicant');
const authRoutes = require('./routes/api/auth');
const evaluationRoutes = require('./routes/api/evaluation');
const memberRoutes = require('./routes/api/member');
const opportunityRoutes = require('./routes/api/opportunity');
const postulationRoutes = require('./routes/api/postulation');
const teamRoutes = require('./routes/api/team');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1 día
    }
}));

// Define la ruta para cerrar sesión
app.get('/logout', (req, res) => {
    // Destruye la sesión del usuario
    req.session.destroy(err => {
      if (err) {
        console.error("Error destroying session:", err);
        return res.status(500).json({ error: 'Error al cerrar la sesión' });
      }
      // Envía una respuesta exitosa
      res.status(200).json({ message: 'Sesión cerrada exitosamente' });
    });
  });

// Middleware para proteger rutas
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    } else {
        return res.status(401).json("Not authenticated");
    }
}



// Rutas de API
app.use('/', applicantRoutes); // /api/applicant
app.use('/', authRoutes); // /api/auth
app.use('/', evaluationRoutes); // /api/evaluation
app.use('/', memberRoutes); // /api/member
app.use('/', opportunityRoutes); // /api/opportunity
app.use('/', postulationRoutes); // /api/postulation
app.use('/', teamRoutes); // /api/team

app.listen(8081, () => {
    console.log("Listening");
});