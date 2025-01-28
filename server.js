const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = process.env.SERVER_PORT || 3000;

// Serve static files from the current directory
app.use(express.static(__dirname));

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER, // replace with your database username
  password: process.env.DB_PASSWORD, // replace with your database password
  database: process.env.DB_NAME
});

// Connect to the database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL Connected...');
});

// Route to get data from the database
app.get('/getData', (req, res) => {
  let sql = 'SELECT * FROM famous_people';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});