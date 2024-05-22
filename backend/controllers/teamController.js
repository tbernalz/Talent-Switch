const { db } = require('../config/db'); // Importa solo la propiedad 'db' del objeto exportado en db.js

exports.createTeam = (req, res) => {
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

        // Get the team_id of the newly created team
        const team_id = data.insertId;

        // Insert the leader as another member in the team_member table
        const leader_sql = "INSERT INTO team_member (`team_id`, `member_email`) VALUES (?, ?)";
        const leader_values = [team_id, req.body.team_leader_email];
        db.query(leader_sql, leader_values, (err, data) => {
            if(err){
                return res.json("Error");
            }
            return res.json("Success");
        });
    });
};

exports.listTeams = (req, res) => {
    const sql = "SELECT team_id, team_name, team_area, start_date, final_date FROM team";
    db.query(sql, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error al recuperar los equipos de trabajo' });
        }
        res.json(data);
    });
};

exports.teamDetail = (req, res) => {
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
        return res.json(data[0]);
    });
};