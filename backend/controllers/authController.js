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

// Controlador para obtener el perfil del usuario
exports.myProfile = (req, res) => {
    const userEmail = req.body.email;
    db.query('SELECT * FROM user WHERE email = ?', [userEmail], (err, result) => {
        if (err) {
            console.error("Error fetching user data:", err);
            return res.status(500).json({ message: "Error fetching user data" });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        const userData = result[0];
        res.json(userData);
    });
};

// Controlador para actualizar el perfil del usuario
exports.updateProfile = (req, res) => {
    const { name, email, actual_area, interest_area, skills } = req.body;

    const sql = `
        UPDATE user
        SET name = ?, actual_area = ?, interest_area = ?, skills = ?
        WHERE email = ?`;

    const values = [name, actual_area, interest_area, skills, email];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error updating user profile:", err);
            return res.status(500).json("Error");
        }

        if (result.affectedRows > 0) {
            return res.json("Success");
        } else {
            return res.status(404).json("User not found");
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

exports.listMyEvaluations = (req, res) => {
    const email = req.query.email; // Obtén el correo del usuario desde los parámetros de la solicitud

    if (!email) {
        return res.status(400).json({ error: 'El correo es obligatorio' });
    }

    // Consulta SQL para seleccionar las evaluaciones donde el correo del usuario es el evaluado
    const sql = `
        SELECT e.id, e.qualification, e.comment, e.evaluation_date
        FROM evaluation AS e
        WHERE e.evaluated_email = ?;
    `;

    db.query(sql, [email], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error al recuperar las Evaluaciones' });
        }
        res.json(data);
    });
};