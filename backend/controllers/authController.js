const { db } = require('../config/db'); // Importa solo la propiedad 'db' del objeto exportado en db.js

exports.signup = (req, res) => {
    const email = req.body.email;
    db.query("SELECT * FROM user WHERE email = ?", email, (err, data) => {
        if (err) {
            return res.json("Error");
        }
        if (data.length > 0) {
            return res.json("email_exists");
        } else {
            const sql = "INSERT INTO user (`name`, `email`, `actual_area`, `interest_area`, `skills`, `user_type`, `password`) VALUES (?)";
            const values = [
                req.body.name,
                req.body.email,
                req.body.actual_area,
                req.body.interest_area,
                req.body.skills,
                req.body.user_type,
                req.body.password
            ];
            db.query(sql, [values], (err, result) => {
                if (err) {
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
            return res.json("Error");
        }
        if (data.length > 0) {
            const user = data[0];
            if (user.password === req.body.password) {
                req.session.user = user;
                req.session.save(err => {
                    if (err) {
                        return res.status(500).json("Error");
                    }
                    return res.json("Success");
                });
            } else {
                return res.json("error_password");
            }
        } else {
            return res.json("email_no_exists");
        }
    });
};

exports.checkSession = (req, res) => {
    if (req.session.user) {
        res.json(req.session.user);
    } else {
        res.status(401).json("No session");
    }
};