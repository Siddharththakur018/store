const User = require("../model/authModel");
const Seller = require("../model/sellerModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "buyer",
    });
    res.status(201).json({ message: "User created sucessfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const registerSeller = async (req, res) => {
  const { name, email, password, shopName, address, mobileNumber } = req.body;

  if (!email || !name || !password || !shopName || !address || !mobileNumber) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: "Seller already exists!" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await new User({
      name,
      email,
      password: hashedPassword,
      role: "seller",
    }).save();

    const sellerProfile = await new Seller({
      user: user._id,
      shopName,
      mobileNumber,
      address,
    }).save();

    res.status(200).json({ success: true, user, sellerProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(404).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "Email not found!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser, registerSeller };
