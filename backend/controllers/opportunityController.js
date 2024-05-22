const { db } = require('../config/db'); // Importa solo la propiedad 'db' del objeto exportado en db.js

exports.createOpportunity = (req, res) => {
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
};

exports.listOpportunities = (req, res) => {
    const sql = "SELECT opportunity_id, opportunity_name, opportunity_area, start_date, final_date, opportunity_state FROM opportunity";
    db.query(sql, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error al recuperar las oportunidades' });
        }
        res.json(data);
    });
};

exports.opportunityDetail = (req, res) => {
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
        return res.json(data[0]);
    });
};