const db = require('../config/db');

exports.toEvaluateMember = (req, res) => {
    const { id, user_id, member_email } = req.body;
    res.json({ id, user_id, member_email });
};

exports.evaluateMember = (req, res) => {
    const { evaluated_email, qualification, comment } = req.body;
    if (!evaluated_email || !qualification || !comment) {
        return res.status(400).json("Missing required fields");
    }

    const sqlSelect = "SELECT evaluation_level, total_evaluations FROM user WHERE email = ?";
    db.query(sqlSelect, [evaluated_email], (err, rows) => {
        if (err) {
            console.error("Error selecting evaluation level:", err);
            return res.status(500).json("Error selecting evaluation level");
        }

        if (rows.length === 0) {
            return res.status(404).json("Member not found");
        }

        const currentLevel = rows[0].evaluation_level;
        const totalEvaluations = rows[0].total_evaluations;
        const newLevel = calculateNewLevel(currentLevel, qualification, totalEvaluations);

        const sqlUpdate = "UPDATE user SET evaluation_level = ?, total_evaluations = ? WHERE email = ?";
        const updatedTotalEvaluations = totalEvaluations + 1;
        db.query(sqlUpdate, [newLevel, updatedTotalEvaluations, evaluated_email], (err, result) => {
            if (err) {
                console.error("Error updating evaluation level:", err);
                return res.status(500).json("Error updating evaluation level");
            }
            
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
};

function calculateNewLevel(currentLevel, newQualification, totalEvaluations) {
    if (currentLevel === null || totalEvaluations === 0) {
        return parseFloat(newQualification);
    }

    const weightedSum = currentLevel * totalEvaluations + parseFloat(newQualification);
    const updatedLevel = weightedSum / (totalEvaluations + 1);

    return updatedLevel;
}