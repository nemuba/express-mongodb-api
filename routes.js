const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const {  UsersController } = require('./controllers');

const ACCESS_KEY = process.env.ACCESS_TOKEN;
const SECRET_KEY = process.env.SECRET_TOKEN;

// Middleware for authentication
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[0];

  if (token == null) return res.sendStatus(401).json({
    message: 'Unauthorized'
  });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403).json({
      message: 'Forbidden'
    });

    if (user !== ACCESS_KEY) return res.sendStatus(401).json({
      message: 'Unauthorized'
    });

    req.user = user;

    next();
  });
}

// Root route
router.get('/', (req, res) => {
  res.json({ message: 'Welcome to my first API in node.js!'});
});

// Users routes
router.get('/users', authenticateToken, UsersController.index);
router.get('/users/:id', authenticateToken, UsersController.show);
router.post('/users', authenticateToken, UsersController.create);
router.put('/users/:id', authenticateToken, UsersController.update);
router.delete('/users/:id', authenticateToken, UsersController.delete);
router.post('/users/destroy', authenticateToken, UsersController.destroy);

module.exports = router;