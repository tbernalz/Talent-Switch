const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
// const myconnection = require('express-myconnection');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: "magneto_db"
});

app.post('/signup', (req, res) => {
    const email = req.body.email;
    // Verificar si el correo ya existe en la base de datos
    db.query("SELECT * FROM user WHERE email = ?", email, (err, data) => {
        if(err){
            return res.json("Error");
        }
        if (data.length > 0){
            return res.json("email_exists");
        } else {
            // Si el correo no existe, procede con el registro
            const sql = "INSERT INTO user (`name`,`email`,`actual_area`,`interest_area`, `skills`, `user_type`, `password`) VALUES (?)";
            const values = [
                req.body.name,
                req.body.email,
                req.body.actual_area,
                req.body.interest_area,
                req.body.skills,
                req.body.user_type,
                req.body.password
            ]
            db.query(sql, [values], (err, result) => {
                if(err){
                    return res.json("Error");
                }
                return res.json("Success");
            });
        }
    });
});


//Complete Sign Up
// app.post('/signup', (req, res) => {
//     const sql = "INSERT INTO user (`name`,`email`,`actual_area`,`interest_area`, `skills`, `user_type`, `password`) VALUES (?)";
//     const values = [
//         req.body.name,
//         req.body.email,
//         req.body.actual_area,
//         req.body.interest_area,
//         req.body.skills,
//         req.body.user_type,
//         req.body.password
//     ]
//     db.query(sql, [values], (err, data) => {
//         // if(err){
//         //     return res.json("Error");
//         // }
//         // return res.json(data);

//         if(err){
//             return res.json("Error");
//         }
//         if (data.length > 0){
//             return res.json("Success");
//         }else {
//             return res.json("Faile");
//         }
//     })
// })

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM user WHERE `email` = ? AND `password` = ?";
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if(err){
            return res.json("Error");
        }
        if (data.length > 0){
            return res.json("Success");
        }else {
            return res.json("Faile");
        }
    })
})

//Opportunity

//create-opportunity
app.post('/create-opportunity', (req, res) => {
    const sql = "INSERT INTO opportunity (`opportunity_name`,`opportunity_leader_email`,`opportunity_area`,`description`, `required_skills`, `start_date`, `final_date`) VALUES (?)";
    const values = [
        req.body.opportunity_name,
        req.body.opportunity_leader_email,
        req.body.opportunity_area,
        req.body.description,
        req.body.required_skills,
        req.body.start_date,
        req.body.final_date
    ]
    db.query(sql, [values], (err, data) => {
        if(err){
            return res.json("Error");
        }
        return res.json("Success");
    })
})

//list-opportunities
app.get('/list-opportunities', (req, res) => {
    //const sql = "SELECT * FROM opportunity";
    const sql = "SELECT opportunity_id, opportunity_name, opportunity_area, start_date, final_date, opportunity_state FROM opportunity";
    db.query(sql, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error al recuperar las oportunidades' });
        }
        res.json(data);
    });
});

//Opportunity Detail
app.get('/opportunities/:id', (req, res) => {
    const opportunityId = req.params.id;
    const sql = "SELECT * FROM opportunity WHERE opportunity_id = ?";
    db.query(sql, opportunityId, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        if (data.length === 0) {
            return res.status(404).json({ error: "Opportunity not found" });
        }
        return res.json(data[0]); // Devolver los detalles de la oportunidad encontrada
    });
});




//Team Project

//create-team
app.post('/create-team', (req, res) => {
    const sql = "INSERT INTO team (`team_name`,`team_leader_email`,`team_area`,`description`, `start_date`, `final_date`) VALUES (?)";
    const values = [
        req.body.team_name,
        req.body.team_leader_email,
        req.body.team_area,
        req.body.description,
        req.body.start_date,
        req.body.final_date
    ]
    db.query(sql, [values], (err, data) => {
        if(err){
            return res.json("Error");
        }
        return res.json("Success");
    })
})

//list-teams
app.get('/list-teams', (req, res) => {
    //const sql = "SELECT * FROM team";
    const sql = "SELECT team_id, team_name, team_area, start_date, final_date FROM team";
    db.query(sql, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error al recuperar los equipos de trabajo' });
        }
        res.json(data);
    });
});

//Team Detail
app.get('/teams/:id', (req, res) => {
    const teamId = req.params.id;
    const sql = "SELECT * FROM team WHERE team_id = ?";
    db.query(sql, teamId, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        if (data.length === 0) {
            return res.status(404).json({ error: "Team not found" });
        }
        return res.json(data[0]); // Devolver los detalles del equipo encontrado
    });
});




//Postulation

//create-postulation
app.post('/create-postulation', (req, res) => {
    const sql = "INSERT INTO postulation (`postulant_name`,`postulant_email`,`postulant_actual_area`,`postulant_interest_area`, `postulant_skills`) VALUES (?, ?, ?, ?, ?)";
    const values = [
        req.body.postulant_name,
        req.body.postulant_email,
        req.body.postulant_actual_area,
        req.body.postulant_interest_area,
        req.body.postulant_skills,
    ]
    db.query(sql, values, (err, data) => {
        if(err){
            return res.json("Error");
        }
        return res.json("Success");
    })
})

app.get('/get-name', (req, res) => {
    const email = req.query.email;
    const sql = "SELECT name FROM user WHERE email = ?";
    db.query(sql, [email], (err, data) => {
        if(err){
            console.log(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if(data.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        const name = data[0].name;
        return res.json({ name: name });
    });
});


//list-postulations
app.get('/list-postulations', (req, res) => {
    const sql = "SELECT postulation_id, postulant_name, postulant_email, postulant_actual_area, postulant_interest_area, postulation_state FROM postulation";
    db.query(sql, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error al recuperar los postulantes' });
        }
        res.json(data);
    });
});

//Postulation Detail
app.get('/postulations/:id', (req, res) => {
    const teamId = req.params.id;
    const sql = "SELECT * FROM postulation WHERE postulation_id = ?";
    db.query(sql, teamId, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        if (data.length === 0) {
            return res.status(404).json({ error: "Postulant not found" });
        }
        return res.json(data[0]); // Devolver los detalles del postulante encontrado
    });
});


// Applicants

//add-applicant
app.post('/add-applicant', (req, res) => {
    const { opportunity_id, applicant_email } = req.body;

    // Verificar si el correo del solicitante ya existe en la tabla user
    db.query("SELECT * FROM user WHERE email = ?", applicant_email, (err, userData) => {
        if (err) {
            return res.json("Error");
        }
        if (userData.length === 0) {
            return res.json("user_not_exists");
        }
        
        // Verificar si el usuario es un empleado
        const user = userData[0];
        if (user.user_type !== 'employee') {
            return res.json("applicant_not_employee");
        }

        // Verificar si el correo del solicitante ya existe en la tabla applicant
        db.query("SELECT * FROM opportunity_applicant WHERE opportunity_id = ? AND applicant_email = ?", [
            opportunity_id, applicant_email], (err, applicantData) => {
            if (err) {
                return res.json("Error");
            }
            if (applicantData.length > 0) {
                return res.json("applicant_exists");
            }

            // Insertar el solicitante en la tabla applicant
            const sql = "INSERT INTO opportunity_applicant (opportunity_id, applicant_email) VALUES (?, ?)";
            const values = [
                opportunity_id, 
                applicant_email
            ];
            db.query(sql, values, (err, result) => {
                if (err) {
                    return res.json("Error");
                }
                return res.json("Success");
            });
        });
    });
});

app.listen(8081, () => {
    console.log("Listening")
});