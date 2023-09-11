// Importing the required modules from Mongoose
const { Schema, model } = require("mongoose");

// Defining the user schema
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Error! Please enter a viable email address"], // Error message if not valid
  },
  thoughts: [{ type: Schema.Types.ObjectId, ref: "Thought" }],
  friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
}, {
  toJSON: { virtuals: true },
  id: false,
});

userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// Creating a model 'User' using the user schema
const User = model("User", userSchema);

// Exporting the 'User' model
module.exports = User;