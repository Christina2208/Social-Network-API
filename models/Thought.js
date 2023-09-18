// Requiring the required libraries
const mongoose = require('mongoose');

// Destructured the 'Schema' object from the mongoose library
const { Schema } = mongoose;

// Define a schema for reactions
const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280, // Maximum limit for the reaction body
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => new Date(timestamp).toLocaleString('en-US', { timeZone: 'UTC' }), // Format timestamp 
  },
});

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1, // Minimum character length for thought text
    maxlength: 280, // Maximum character limit for thought text
    unique: true, 
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => new Date(timestamp).toLocaleString('en-US', { timeZone: 'UTC' }), // Format timestamp 
  },
  username: {
    type: String,
    required: true,
    trim: true, 
  },
  reactions: [reactionSchema],
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
});

thoughtSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

// Creating a model 'Thought' using the 'thoughtSchema'
const Thought = mongoose.model('Thought', thoughtSchema);

// Exporting the 'Thought' model
module.exports = Thought;