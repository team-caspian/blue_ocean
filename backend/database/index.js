// import mysql
const mysql = require('mysql2');
require('dotenv').config();



// create a connection to the db
const connection = mysql.createConnection({
<<<<<<< HEAD
  host: process.env.DATABASE_HOST_IP,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_CURRENT_DB
=======
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'early_bird'
  // host: process.env.DATABASE_HOST_IP,
  // port: process.env.DATABASE_PORT,
  // user: process.env.DATABASE_USER,
  // password: process.env.DATABASE_PASSWORD,
  // database: process.env.DATABASE_CURRENT_DB
>>>>>>> main
});

// actually connect
connection.connect( (err) => {
  if (err) {
    console.log('there was an error connecting to the database', err);
  } else {
    console.log('successfully connected to the db from the server');
  }

});

module.exports = connection;