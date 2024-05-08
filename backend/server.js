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

        // Obtener el team_id del equipo recién creado
        const team_id = data.insertId;

        // Insertar al líder como un miembro más en la tabla team_member
        const leader_sql = "INSERT INTO team_member (`team_id`, `member_email`) VALUES (?, ?)";
        const leader_values = [team_id, req.body.team_leader_email];
        db.query(leader_sql, leader_values, (err, data) => {
            if(err){
                return res.json("Error");
            }
            return res.json("Success");
        });
    });
});

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

//list-applicants
app.get('/opportunities/:id/list-applicants', (req, res) => {
    const opportunityId = req.params.id;
    const sql = "SELECT id, applicant_email, applicant_state FROM opportunity_applicant WHERE opportunity_id = ?";
    db.query(sql, [opportunityId], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error al recuperar los solicitantes de la oportunidad' });
        }
        res.json(data);
    });
});

//Members

//add-member
app.post('/add-member', (req, res) => {
    const { team_id, member_email } = req.body;

    // Verificar si el correo del solicitante ya existe en la tabla user
    db.query("SELECT * FROM user WHERE email = ?", member_email, (err, userData) => {
        if (err) {
            return res.json("Error");
        }
        if (userData.length === 0) {
            return res.json("user_not_exists");
        }
        
        // Verificar si el usuario es un empleado
        const user = userData[0];
        if (user.user_type !== 'employee') {
            return res.json("member_not_employee");
        }

        // Verificar si el correo del solicitante ya existe en la tabla member
        db.query("SELECT * FROM team_member WHERE team_id = ? AND member_email = ?", [
            team_id, member_email], (err, membertData) => {
            if (err) {
                return res.json("Error");
            }
            if (membertData.length > 0) {
                return res.json("member_exists");
            }

            // Insertar el solicitante en la tabla member
            const sql = "INSERT INTO team_member (team_id, member_email) VALUES (?, ?)";
            const values = [
                team_id, 
                member_email
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

//list-members
app.get('/teams/:id/list-members', (req, res) => {
    const teamId = req.params.id;
    const sql = "SELECT id, member_email FROM team_member WHERE team_id = ?";
    db.query(sql, [teamId], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error al recuperar los miembros del Equipo' });
        }
        res.json(data);
    });
});

// Ruta para obtener el user_id asociado a un correo electrónico de miembro
app.get('/get-user-id', (req, res) => {
    const email = req.query.email;
    const sql = "SELECT user_id FROM user WHERE email = ?";
    db.query(sql, [email], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error retrieving user ID' });
        }
        if (data.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        const user_id = data[0].user_id;
        return res.json({ user_id: user_id });
    });
});


// Evaluate member
// app.post('/evaluate-member/:user_id', (req, res) => {
//     const { qualification, comment } = req.body;
//     const member_email;

//     // Insertar la evaluación del miembro en la base de datos
//     const sql = "INSERT INTO evaluation (evaluated_email, qualification, comment, evaluation_date) VALUES (?, ?, ?, NOW())";
//     const values = [member_email, qualification, comment];
//     db.query(sql, values, (err, result) => {
//         if (err) {
//             return res.json("Error");
//         }
//         return res.json("Success");
//     });
// });

//función para pasar datos desdee list-members hasta evaluate-member
app.post('/to-evaluate-member', (req, res) => {
    const { id, user_id, member_email } = req.body;
    
    // Envía todos los datos del miembro en un solo objeto JSON
    res.json({ id, user_id, member_email });
});


//función de evaluación, inserción y actualización del respectivo usuario
app.post('/evaluate-member', (req, res) => {
    const { evaluated_email, qualification, comment } = req.body;

    // Verifica si todos los campos necesarios están presentes
    if (!evaluated_email || !qualification || !comment) {
        return res.status(400).json("Missing required fields");
    }

    // Obtener el nivel actual de evaluación del miembro de la base de datos
    const sqlSelect = "SELECT evaluation_level, total_evaluations FROM user WHERE email = ?";
    db.query(sqlSelect, [evaluated_email], (err, rows) => {
        if (err) {
            console.error("Error selecting evaluation level:", err);
            return res.status(500).json("Error selecting evaluation level");
        }

        if (rows.length === 0) {
            return res.status(404).json("Member not found");
        }

        // Calcular el nuevo nivel de evaluación combinando el nivel actual y la nueva calificación
        const currentLevel = rows[0].evaluation_level;
        const totalEvaluations = rows[0].total_evaluations;
        const newLevel = calculateNewLevel(currentLevel, qualification, totalEvaluations);

        // Actualizar el campo evaluation_level en la base de datos
        const sqlUpdate = "UPDATE user SET evaluation_level = ?, total_evaluations = ? WHERE email = ?";
        const updatedTotalEvaluations = totalEvaluations + 1;
        db.query(sqlUpdate, [newLevel, updatedTotalEvaluations, evaluated_email], (err, result) => {
            if (err) {
                console.error("Error updating evaluation level:", err);
                return res.status(500).json("Error updating evaluation level");
            }
            
            // Insertar la evaluación del miembro en la tabla evaluation
            const sqlInsert = "INSERT INTO evaluation (evaluated_email, qualification, comment, evaluation_date) VALUES (?, ?, ?, NOW())";
            const values = [evaluated_email, qualification, comment];
            db.query(sqlInsert, values, (err, result) => {
                if (err) {
                    console.error("Error inserting evaluation:", err);
                    return res.status(500).json("Error inserting evaluation");
                }
                return res.json("Success");
            });
        });
    });
});

// Función para calcular el nuevo nivel de evaluación
function calculateNewLevel(currentLevel, newQualification, totalEvaluations) {
    // Manejar el caso en el que el usuario no ha recibido ninguna evaluación
    if (currentLevel === null || totalEvaluations === 0) {
        return parseFloat(newQualification); // Retornar la nueva calificación como nivel
    }

    // Calcular el nuevo nivel como el promedio ponderado de las calificaciones
    const weightedSum = currentLevel * totalEvaluations + parseFloat(newQualification);
    const updatedLevel = weightedSum / (totalEvaluations + 1);

    return updatedLevel;
}




// app.post('/evaluate-member', (req, res) => {
//     const { evaluated_email, qualification, comment } = req.body;

//     // Verifica si todos los campos necesarios están presentes
//     if (!evaluated_email || !qualification || !comment) {
//         return res.status(400).json("Missing required fields");
//     }
    
//     // Insertar la evaluación del miembro en la base de datos
//     const sql = "INSERT INTO evaluation (evaluated_email, qualification, comment, evaluation_date) VALUES (?, ?, ?, NOW())";
//     const values = [evaluated_email, qualification, comment];
//     db.query(sql, values, (err, result) => {
//         if (err) {
//             console.error("Error inserting evaluation:", err);
//             return res.status(500).json("Error inserting evaluation");
//         }
//         return res.json("Success");
//     });
// });



app.listen(8081, () => {
    console.log("Listening")
});