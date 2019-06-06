import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "./User";

const router = express.Router();

//Route to register new users
router.post("/", (req, res) => {
  const { name, email, password } = req.body;

  // simple validation
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "please enter all required fields" });
  }

  //Check for existing user
  User.findOne({ email }).then(user => {
    if (user)
      return res
        .status(400)
        .json({ message: " User already exists with that email address" });

    const newUser = new User({
      name,
      email,
      password
    });

    //create salt and hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(user => {
          res.json({
            user: {
              id: user.id,
              name: user.name,
              email: user.email
            },
            message: "User Registered Succesfully"
          });
        });
      });
    });
  });
});

export default router;
