const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const moment = require('moment');
const routes = require('./routes');
const session = require('express-session');

// Connect to MongoDB
mongoose.connect('mongodb+srv://Cluster59812:123@cluster59812.sqwxoct.mongodb.net/?retryWrites=true&w=majority', {
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

// Added the session middleware
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

app.use('/api', routes);

// Start the server
const port = 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

