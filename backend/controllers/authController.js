const db = require('../config/db');

exports.signup = (req, res) => {
    const email = req.body.email;
    // Check if the email already exist in the DB
    db.query("SELECT * FROM user WHERE email = ?", email, (err, data) => {
        if(err){
            return res.json("Error");
        }
        if (data.length > 0){
            return res.json("email_exists");
        } else {
            // If the email doesn't exist, the it proceed with registration
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
};

exports.login = (req, res) => {
    const sql = "SELECT * FROM user WHERE `email` = ? AND `password` = ?";
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if(err){
            console.error(err);
            return res.json("Error");
        }
        if (data.length > 0){
            console.log("Success login");
            return res.json("Success");
        }else {
            console.log("Failed login");
            return res.json("Faile");
        }
    })
};