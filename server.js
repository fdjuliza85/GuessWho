const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

// Serve static files from the current directory
app.use(express.static(__dirname));

// Create connection to the database
const db = mysql.createConnection({
  host: '192.168.50.100',
  user: 'root', // replace with your database username
  password: 'STC4kvu@me', // replace with your database password
  database: 'bible_character'
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