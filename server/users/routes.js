import express from 'express';
import bcrypt from 'bcryptjs';
import gravatar from 'gravatar';
import jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator/check';
import User from './User';

const router = express.Router();

//Route to register new users
router.post(
  '/',
  [
    check('email', 'please include a valid email').isEmail(),
    check('password', 'Please enter a password with 5 or more characters').isLength({ min: 5 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body; // here we are destructuring our application

    try {
      //see if user exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          errors: [{ msg: 'User already exists with that email address' }]
        });
      }

      // get user gravatar
      const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' });

      //create a new instance of the created user
      user = new User({ name, email, password, avatar });

      // encrypt password using bcrypt
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      //save user in the database
      await user.save();

      const payload = {
        user: { id: user.id }
      };

      jwt.sign(payload, process.env.secret, { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
      res.json({ message: 'User Registered Succesfully' });
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

export default router;
