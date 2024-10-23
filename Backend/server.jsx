// index.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Your MySQL password (leave empty if no password)
  database: 'login_db', // Your database name
});

// Connect to MySQL
db.connect(err => {
  if (err) throw err;
  console.log('MySQL Connected...');
});

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(sql, [username, password], (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Database error' });
    }

    if (results.length > 0) {
      return res.json({ success: true, message: 'Login successful!' });
    } else {
      return res.json({ success: false, message: 'Invalid credentials' });
    }
  });
});



// Routes for hive details

// Get hive details
app.get('/hive', (req, res) => {
  const { hiveNo } = req.query;

  if (!hiveNo) {
      return res.status(400).json({ success: false, message: 'Hive number is required' });
  }

  const query = 'SELECT * FROM hives WHERE hiveNo = ?';
  
  db.query(query, [hiveNo], (error, results) => {
      if (error) {
          console.error('Database error:', error);  // Log the exact error for debugging
          return res.status(500).json({ success: false, message: 'Database error' });
      }

      if (results.length > 0) {
          return res.json({ success: true, data: results[0] });
      } else {
          return res.json({ success: false, message: 'No hive details found.' });
      }
  });
});


// Create a new hive
app.post('/hive-details', (req, res) => {
    const newHive = req.body;
    const query = 'INSERT INTO hives (hiveNo, humidity, temperature, beeInOut, raindrops, expectedHarvestDate, honeyLevel) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [newHive.hiveNo, newHive.humidity, newHive.temperature, newHive.beeInOut, newHive.raindrops, newHive.expectedHarvestDate, newHive.honeyLevel], (error) => {
        if (error) {
            return res.status(500).json({ success: false, message: 'Failed to create hive.' });
        }
        res.json({ success: true, message: `Hive #${newHive.hiveNo} has been created.` });
    });
});

// Update a hive
app.put('/hive-details', (req, res) => {
    const updateData = req.body;
    const query = 'UPDATE hives SET humidity = ?, temperature = ?, beeInOut = ?, raindrops = ?, expectedHarvestDate = ?, honeyLevel = ? WHERE hiveNo = ?';
    db.query(query, [updateData.humidity, updateData.temperature, updateData.beeInOut, updateData.raindrops, updateData.expectedHarvestDate, updateData.honeyLevel, updateData.hiveNo], (error) => {
        if (error) {
            return res.status(500).json({ success: false, message: 'Failed to update hive.' });
        }
        res.json({ success: true, message: `Hive #${updateData.hiveNo} has been updated.` });
    });
});

// Delete a hive
app.delete('/hive-details', (req, res) => {
    const { hiveNo } = req.query;
    const query = 'DELETE FROM hives WHERE hiveNo = ?';
    db.query(query, [hiveNo], (error) => {
        if (error) {
            return res.status(500).json({ success: false, message: 'Failed to delete hive.' });
        }
        res.json({ success: true, message: `Hive #${hiveNo} has been deleted.` });
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
