const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const moment = require('moment');
const routes = require('./routes');
//
// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
  });

// Create an Express app
const app = express();

// Enable CORS for all routes
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api', routes);

// Start the server
const port = 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
