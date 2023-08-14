const jwt =  require('jsonwebtoken');

const ACCESS_KEY = process.env.ACCESS_TOKEN;
const SECRET_KEY = process.env.SECRET_TOKEN;

// Middleware for authentication
const authorization = (req, res, next) => {
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

module.exports = authorization;