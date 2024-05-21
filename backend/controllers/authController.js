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
    const sql = "SELECT * FROM user WHERE `email` = ?";
    db.query(sql, [req.body.email], (err, data) => {
        if (err) {
            console.error(err);
            return res.json("Error");
        }
        if (data.length > 0) {
            const user = data[0];
            if (user.password === req.body.password) {
                console.log("Success login");
                return res.json("Success");
            } else {
                console.log("Incorrect password");
                return res.json("error_password");
            }
        } else {
            console.log("Email not found");
            return res.json("email_no_exists");
        }
    });
};