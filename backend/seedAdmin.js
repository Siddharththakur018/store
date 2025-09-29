const mongoose = require("mongoose");
const User = require("./model/authModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    const existingAdmin = await User.findOne({ role: "admin" });
    if (existingAdmin) {
      console.log("Admin already exists:", existingAdmin.email);
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("Siddharth18", 10);

    const admin = new User({
      name: "Siddharth",
      email: "sid@gmail.com",
      password: hashedPassword,
      role: "admin",
    });

    await admin.save();
    console.log("Admin user created:", admin.email);

    process.exit();
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

seedAdmin();
