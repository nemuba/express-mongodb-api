const express = require('express');
const router = express.Router();
const {  UsersController } = require('./controllers');
const authorization = require('./middlewares/authorization');

// Root route
router.get('/', (req, res) => {
  res.json({ message: 'Welcome to my first API in node.js!'});
});

// Users routes
router.get('/users', authorization, UsersController.index);
router.get('/users/:id', authorization, UsersController.show);
router.post('/users', authorization, UsersController.create);
router.put('/users/:id', authorization, UsersController.update);
router.delete('/users/:id', authorization, UsersController.delete);
router.post('/users/destroy', authorization, UsersController.destroy);

module.exports = router;