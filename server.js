const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db'); // Import the db connection

const app = express();
app.use(cors());
app.use(express.json());

// Sample route using the db
app.get('/api/books', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM books');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB query failed' });
  }
});

// Serve React app if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));
  app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || 8082;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
