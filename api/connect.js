const mysql = require('mysql')


const db = mysql.createConnection({

    host:'localhost',
    user:"root",
    password:"liverpool",
    database:"contact_list"


})

db.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL database:', err);
      return;
    }
    console.log('Connected to MySQL database');
    // You can perform database operations here

  });

module.exports = db