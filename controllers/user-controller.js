// Requiring modules
const User = require("../models/User");
const Thought = require("../models/Thought");

// Getting all users with their thoughts and friends
const userController = {
  getAllUsers: async (req, res) => {
    try {
      const userData = await User.find({})
        .populate("thoughts")
        .populate("friends");
      res.json({ data: userData });
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error", error: err });
    }
  },

  // Getting a single user by the ID with their thoughts and friends
  getSingleUser: async (req, res) => {
    try {
      const { id } = req.params;
      const userData = await User.findOne({ _id: id })
        .populate("thoughts")
        .populate("friends");
      
      if (!userData) {
        res.status(404).json({ message: "No user was found" });
        return;
      }
      
      res.json({ data: userData });
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error", error: err });
    }
  },

  // Creating a new user
  createUser: async (req, res) => {
    try {
      const { username, email } = req.body;
      const userData = await User.create({ username, email });
      res.json({ data: userData });
    } catch (err) {
      res.status(400).json({ message: "Bad Request", error: err });
    }
  },

  // Updating user's informatio
  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const { username, email } = req.body;
      const userData = await User.findOneAndUpdate({ _id: id }, { username, email }, { new: true })
        .populate("thoughts")
        .populate("friends");
      
      if (!userData) {
        res.status(404).json({ message: "No user was found" });
        return;
      }
      
      res.json({ data: userData });
    } catch (err) {
      res.status(400).json({ message: "Bad Request", error: err });
    }
  },

  // Deleting a user and their associated thoughts
  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const userData = await User.findOneAndDelete({ _id: id });
      
      if (!userData) {
        res.status(404).json({ message: "No user was found" });
        return;
      }
      
      await Thought.deleteMany({ username: userData.username });
      res.json({ message: "User and associated thoughts have been removed" });
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error", error: err });
    }
  },

  // Adding a friend to the user's friend list
  addFriend: async (req, res) => {
    try {
      const { userId, friendId } = req.params;
      const userData = await User.findByIdAndUpdate(
        userId,
        { $addToSet: { friends: friendId } },
        { new: true }
      ).populate("friends");
      
      if (!userData) {
        res.status(404).json({ message: "No user was found" });
        return;
      }
      
      res.json({ data: userData });
    } catch (err) {
      res.status(400).json({ message: "Bad Request", error: err });
    }
  },
  
  // Remove a friend from the user's friend list
  removeFriend: async (req, res) => {
    try {
      const { userId, friendId } = req.params;
      const userData = await User.findByIdAndUpdate(
        userId,
        { $pull: { friends: friendId } },
        { new: true }
      ).populate("friends");
      
      if (!userData) {
        res.status(404).json({ message: "No user was found" });
        return;
      }
      
      res.json({ data: userData });
    } catch (err) {
      res.status(400).json({ message: "Bad Request", error: err });
    }
  },
};

// Exporting
module.exports = userController;