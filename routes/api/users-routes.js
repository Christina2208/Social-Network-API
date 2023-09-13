// Requiring express and creating routes for users.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');

// GET all the users and POST a new user
router.route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

// GET a single user by the ID, PUT (update) a user by the ID, DELETE a user by the ID
router.route('/:id')
  .get(userController.getSingleUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

// POST a new friend for a specific user
router.route('/:userId/friends/:friendId')
  .post(userController.addFriend);

// DELETE a friend from a specific user by the friend ID
router.route('/:userId/friends/:friendId')
  .delete(userController.removeFriend);

// Exporting
module.exports = router;