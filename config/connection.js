// Importing the mongoose library
const mongoose = require('mongoose');

// Connect to a MongoDB database named 'social-network' running on localhost at port 27017
mongoose.connect('mongodb://localhost:27017/social-network', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Exporting the mongoose connection
module.exports = mongoose.connection;