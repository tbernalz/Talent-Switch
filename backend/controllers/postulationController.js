const { db } = require('../config/db'); // Importa solo la propiedad 'db' del objeto exportado en db.js

exports.createPostulation = (req, res) => {
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
};

exports.getName = (req, res) => {
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
};

exports.listPostulations = (req, res) => {
    const sql = "SELECT postulation_id, postulant_name, postulant_email, postulant_actual_area, postulant_interest_area, postulation_state FROM postulation";
    db.query(sql, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error al recuperar los postulantes' });
        }
        res.json(data);
    });
};

exports.listMyPostulations = (req, res) => {
    const email = req.query.email; // Obtenemos el correo del usuario desde los parámetros de la solicitud

    if (!email) {
        return res.status(400).json({ error: 'El correo es obligatorio' });
    }

    const sql = "SELECT postulation_id, postulant_name, postulant_email, postulant_actual_area, postulant_interest_area, postulation_state FROM postulation WHERE postulant_email = ?";
    db.query(sql, [email], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error al recuperar las postulaciones' });
        }
        res.json(data);
    });
};

exports.postulationDetail = (req, res) => {
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
        return res.json(data[0]);
    });
};