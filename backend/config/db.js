const mysql = require('mysql');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const dbConfig = {
    //host: 'db', // the name of the MariaDB service in docker-compose.yml
    host: 'localhost',
    user: 'root',
    password: '',//'admin123', // password: '', 
    database: 'magneto_db'
};

const db = mysql.createConnection(dbConfig);

db.connect((err) => {
    if (err) {
        console.error('An error occurred while connecting to the DB');
        console.error(err.message);
        return;
    }
  
    console.log('Successfully connected to the DB');
});

const sessionStore = new MySQLStore({
    ...dbConfig,
    clearExpired: true,
    checkExpirationInterval: 900000, // 15 minutos
    expiration: 86400000 // 1 día
});

module.exports = { db, sessionStore };