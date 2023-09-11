// Importing the mongoose library
const mongoose = require('mongoose');

const { Schema } = mongoose;

// Defining a schema for reactions
const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId()
  },

  reactionBody: {
    type: String,
    required: true,
    maxlength: 280 // Max limit of the reaction length
  },

  username: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => new Date(timestamp).toISOString() 
  }
});

// Defining a schema for thoughts
const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1, // Minimum length of the thought
    maxlength: 280 // Max limit of the thought length
  },

  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => new Date(timestamp).toISOString()
  },

  username: {
    type: String,
    required: true
  },

  reactions: [reactionSchema] 
});

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = mongoose.model('Thought', thoughtSchema);

// Exporting the 'Thought" model
module.exports = Thought;