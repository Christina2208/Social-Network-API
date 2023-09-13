// Requiring express and creating routes for thoughts.js
const express = require('express');
const router = express.Router();
const thoughtController = require('../controllers/thought-controller');

// GET all the thoughts and POST a new thought
router.route('/')
  .get(thoughtController.getAllThoughts)
  .post(thoughtController.createThought);

// GET a single thought by the ID, PUT (update) a thought by ID, and DELETE a thought by ID
router.route('/:id')
  .get(thoughtController.getSingleThought)
  .put(thoughtController.updateThought)
  .delete(thoughtController.deleteThought);

// POST a new reaction for a specific thought
router.route('/:thoughtId/reactions')
  .post(thoughtController.addReaction);

// DELETE a reaction from a specific thought by the reaction ID
router.route('/:thoughtId/reactions/:reactionId')
  .delete(thoughtController.removeReaction);

// Exporting 
module.exports = router;