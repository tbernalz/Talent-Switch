const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
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

module.exports = db;