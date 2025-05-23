const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const app = express();

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Define routes in SPECIFIC ORDER
app.post('/collect', async (req, res) => {
  try {
    const data = {
      ...req.body,
      timestamp: new Date().toISOString()
    };
    
    const filename = `data_${Date.now()}.json`;
    await fs.writeFile(path.join(__dirname, 'data', filename), JSON.stringify(data));
    
    res.sendStatus(200);
  } catch (err) {
    console.error('Error saving data:', err);
    res.sendStatus(500);
  }
});

// Explicit root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Remove ALL other route handlers


// Start server
app.listen(3000, () => {
  console.log('Server running: http://localhost:3000');
});