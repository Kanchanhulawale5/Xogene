const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'yourUsername',
  password: 'yourPassword',
  database: 'yourDatabase'
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database.');
});

// Define a route to get drug names
app.get('/drugs', (req, res) => {
  const name = req.query.name;
  const query = 'SELECT * FROM drugs WHERE name LIKE ?';
  
  connection.query(query, [`%${name}%`], (err, results) => {
    if (err) {
      console.error('Error fetching drugs:', err);
      res.status(500).send('Server error');
      return;
    }
    res.json(results);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
