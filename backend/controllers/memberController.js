const { db } = require('../config/db'); // Importa solo la propiedad 'db' del objeto exportado en db.js

exports.addMember = (req, res) => {
    const { team_id, member_email } = req.body;
    db.query("SELECT * FROM user WHERE email = ?", member_email, (err, userData) => {
        if (err) {
            return res.json("Error");
        }
        if (userData.length === 0) {
            return res.json("user_not_exists");
        }
        
        const user = userData[0];
        if (user.user_type !== 'employee') {
            return res.json("member_not_employee");
        }

        db.query("SELECT * FROM team_member WHERE team_id = ? AND member_email = ?", [
            team_id, member_email], (err, membertData) => {
            if (err) {
                return res.json("Error");
            }
            if (membertData.length > 0) {
                return res.json("member_exists");
            }

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
};

exports.listMembers = (req, res) => {
    const teamId = req.params.id;
    const sql = "SELECT id, member_email FROM team_member WHERE team_id = ?";
    db.query(sql, [teamId], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error al recuperar los miembros del Equipo' });
        }
        res.json(data);
    });
};

exports.getUserId = (req, res) => {
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
};