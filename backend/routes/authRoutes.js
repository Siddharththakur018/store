const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  registerSeller,
  me,
  logoutUser,
} = require("../controller/authController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.get('/me',authMiddleware, me)
router.post("/register", registerUser);
router.post("/register-seller", registerSeller);
router.post("/login", loginUser);
router.post("/logout", logoutUser)


module.exports = router;
