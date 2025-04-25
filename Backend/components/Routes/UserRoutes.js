const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/UserSchema");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const ExistingUser = await User.findOne({ email });
    if (ExistingUser) {
      return res
        .status(400)
        .json({ msg: "This emailId is already registred. " });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res
      .status(201)
      .json({ msg: "Signup successful. Please login to continue." });
  } catch (error) {
    res.status(500).json({ msg: "SignUp Failed", error });
  }
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ msg: "user not found! please SignUp" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      SECRET_KEY,
      { expiresIn: "1hr" }
    );

    res.status(201).json({ msg: "Login succesful", token, user });
  } catch (error) {
    res.status(500).json({ msg: "SignUp Failed", error });
    console.log(error);
  }
});

router.patch("/reset", async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    user.password = newPassword;

    await user.save();

    console.log(`Password updated for user: ${user.name}`);
    res.status(200).json({ msg: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ msg: "Server error, please try again later" });
  }
});

module.exports = router;
