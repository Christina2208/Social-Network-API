// Requiring modules
const Thought = require("../models/Thought");
const User = require("../models/User");

const thoughtController = {
  // Retrieving all thoughts
  async getAllThoughts(req, res) {
    try {
      const thoughtData = await Thought.find({});
      res.json(thoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Retrieving a single thought by the ID
  async getSingleThought(req, res) {
    try {
      const { id } = req.params;
      const thoughtData = await Thought.findOne({ _id: id });
      if (!thoughtData) {
        res.status(404).json({ message: "No thought was found" });
        return;
      }
      res.json(thoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Creating a new thought
  async createThought(req, res) {
    try {
      const { thoughtText, username } = req.body;
      const thoughtData = await Thought.create({ thoughtText, username });
      await User.findOneAndUpdate(
        { username },
        { $push: { thoughts: thoughtData._id } },
        { new: true }
      );
      res.json(thoughtData);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // Updating a thought by the ID
  async updateThought(req, res) {
    try {
      const { id } = req.params;
      const { thoughtText } = req.body;
      const thoughtData = await Thought.findOneAndUpdate(
        { _id: id },
        { thoughtText },
        { new: true }
      );
      if (!thoughtData) {
        res.status(404).json({ message: "No thought was found" });
        return;
      }
      res.json(thoughtData);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // Deleting a thought by the ID
  async deleteThought(req, res) {
    try {
      const { id } = req.params;
      const thoughtData = await Thought.findOneAndDelete({ _id: id });
      if (!thoughtData) {
        res.status(404).json({ message: "No thought was found" });
        return;
      }
      await User.updateMany(
        { thoughts: id },
        { $pull: { thoughts: id } },
        { multi: true }
      );
      res.json({ message: "Thought and associated reactions have been removed" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Adding a reaction to a thought
  async addReaction(req, res) {
    try {
      const { thoughtId } = req.params;
      const { reactionBody, username } = req.body;
      const thoughtData = await Thought.findOneAndUpdate(
        { _id: thoughtId },
        { $push: { reactions: { reactionBody, username } } },
        { new: true }
      );
      if (!thoughtData) {
        res.status(404).json({ message: "No thought was found" });
        return;
      }
      res.json(thoughtData);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // Removing a reaction from a thought by the reaction ID
  async removeReaction(req, res) {
    try {
      const { thoughtId, reactionId } = req.params;
      const thoughtData = await Thought.findOneAndUpdate(
        { _id: thoughtId },
        { $pull: { reactions: { _id: reactionId } } },
        { new: true }
      );
      if (!thoughtData) {
        res.status(404).json({ message: "No thought was found" });
        return;
      }
      res.json(thoughtData);
    } catch (err) {
      res.status(400).json(err);
    }
  },
};

// Exporting
module.exports = thoughtController;