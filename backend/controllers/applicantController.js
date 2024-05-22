const { db } = require('../config/db'); // Importa solo la propiedad 'db' del objeto exportado en db.js

exports.addApplicant = (req, res) => {
    const { opportunity_id, applicant_email } = req.body;
    db.query("SELECT * FROM user WHERE email = ?", applicant_email, (err, userData) => {
        if (err) {
            return res.json("Error");
        }
        if (userData.length === 0) {
            return res.json("user_not_exists");
        }
        
        const user = userData[0];
        if (user.user_type !== 'employee') {
            return res.json("applicant_not_employee");
        }

        db.query("SELECT * FROM opportunity_applicant WHERE opportunity_id = ? AND applicant_email = ?", [
            opportunity_id, applicant_email], (err, applicantData) => {
            if (err) {
                return res.json("Error");
            }
            if (applicantData.length > 0) {
                return res.json("applicant_exists");
            }

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
};

exports.listApplicants = (req, res) => {
    const opportunityId = req.params.id;
    const sql = "SELECT id, applicant_email, applicant_state FROM opportunity_applicant WHERE opportunity_id = ?";
    db.query(sql, [opportunityId], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error al recuperar los solicitantes de la oportunidad' });
        }
        res.json(data);
    });
};