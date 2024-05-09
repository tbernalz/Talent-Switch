const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
// const myconnection = require('express-myconnection');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost', // localhost 127.0.0.1
    user: 'root',
    password: '',
    database: "magneto_db"
});

db.connect((err) => {
    if(err) {
      console.error('An error occurred while connecting to the DB');
      console.error(err.message);
      return;
    }
  
    console.log('Successfully connected to the DB');
  });

app.post('/signup', (req, res) => {
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
    db.query(sql, [values], (err, data) => {
        // if(err){
        //     return res.json("Error");
        // }
        // return res.json(data);

        if(err){
            return res.json("Error");
        }
        if (data.length > 0){
            return res.json("Success");
        }else {
            return res.json("Faile");
        }
    })
})

app.post('/login', (req, res) => {
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
})

app.post('/create-opportunity', (req, res) => {
    const sql = "INSERT INTO opportunity (`opportunity_name`,`leader_user_id`,`opportunity_area`,`description`, `required_skills`, `start_date`, `final_date`) VALUES (?)";
    const values = [
        req.body.opportunity_name,
        req.body.leader_user_id,
        req.body.opportunity_area,
        req.body.description,
        req.body.required_skills,
        req.body.start_date,
        req.body.final_date
    ]
    db.query(sql, [values], (err, data) => {
        // if(err){
        //     return res.json("Error");
        // }
        // return res.json(data);

        if(err){
            return res.json("Error");
        }
        return res.json("Success");
    })
})

app.post('/create-team', (req, res) => {
    const sql = "INSERT INTO team (`team_name`,`leader_user_id`,`team_area`,`description`, `start_date`, `final_date`) VALUES (?)";
    const values = [
        req.body.team_name,
        req.body.leader_user_id,
        req.body.team_area,
        req.body.description,
        req.body.start_date,
        req.body.final_date
    ]
    db.query(sql, [values], (err, data) => {
        // if(err){
        //     return res.json("Error");
        // }
        // return res.json(data);

        if(err){
            return res.json("Error");
        }
        return res.json("Success");
    })
})


app.listen(8081, () => {
    console.log("Listening")
});