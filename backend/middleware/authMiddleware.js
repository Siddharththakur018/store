const jwt = require("jsonwebtoken");
const Seller = require("../model/sellerModel");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Token is missing!" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const roleMiddleware = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: No user data" });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: Access denied" });
    }

    next();
  };
};

const sellerApprovalStatus = async (req, res, next) => {
  try {
    if (req.user.role !== "seller") {
      res.status(403).json({ message: "Not a Seller!" });
    }

    const seller = await Seller.findOne({ user: req.user.id });
    if (!seller) {
      return res.status(404).json({ message: "Seller profile not found" });
    }

    if (seller.status !== "approved") {
      return res.status(403).json({ message: "Approval not given by admin" });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { authMiddleware, roleMiddleware, sellerApprovalStatus };
