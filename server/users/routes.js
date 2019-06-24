import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from './User';

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        errors: [{ msg: 'User already exists with that email address' }]
      });
    }

    user = new User({ name, email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: { id: user.id }
    };

    jwt.sign(payload, process.env.secret, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
    res.json({ msg: 'User Registered Succesfully' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Internal Server Error');
  }
});

export default router;
