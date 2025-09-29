const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  registerSeller,
} = require("../controller/authController");

router.post("/register", registerUser);
router.post("/register-seller", registerSeller);
router.post("/login", loginUser);

module.exports = router;
