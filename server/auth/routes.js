import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../users/User";

const router = express.Router();

//Route to register new users
router.post("/", (req, res) => {
  const { email, password } = req.body;

  // simple validation
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "please enter all required fields" });
  }

  //Check if username exists in the database
  User.findOne({ email }).then(user => {
    if (!user)
      return res.status(400).json({ message: " Invalid username provided" });

    //validate password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) return res.json({ message: "Invalid password provided" });

      jwt.sign(
        { id: user.id },
        process.env.secret,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user.id,
              email: user.email
            }
          });
        }
      );
    });
  });
});

export default router;
