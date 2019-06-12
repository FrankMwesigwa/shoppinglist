import jwt from 'jsonwebtoken';

const token = (req, res, next) => {
  //get token from header
  const token = req.header('x-auth-token');

  //check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorisation denied' });
  }

  //verify token
  try {
    const decoded = jwt.verify(token, process.env.secret);
    req.user = decoded.user;
  } catch (err) {
    res.status(401).json({ msg: 'Token is invalid' });
  }
};

export default token;
