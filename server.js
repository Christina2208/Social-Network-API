// Importing all the required libraries/modules
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
const app = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

// Connecting to MongoDB and handling the 'open' event
db.once('open', () => {
  console.log('Connected to the database.');
});

// Defining the routes under the '/api' path
app.use('/api', routes);

// Starting the server and listening on the specified port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});