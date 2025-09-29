const express = require("express");
const router = express.Router();
const {
  sellerProfile,
  updateSellerProfile,
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductBySeller,
  getProductById,
} = require("../controller/sellerController");
const {
  authMiddleware,
  roleMiddleware,
  sellerApprovalStatus,
} = require("../middleware/authMiddleware");

router.get(
  "/seller-profile",
  authMiddleware,
  roleMiddleware("seller"),
  sellerApprovalStatus,
  sellerProfile
);

router.put(
  "/update-seller-profile",
  roleMiddleware("seller"),
  updateSellerProfile
);

router.post(
  "/create-product",
  authMiddleware,
  roleMiddleware("seller"),
  sellerApprovalStatus,
  createProduct
);

router.get("/all-products", getAllProducts);

router.put(
  "/update-product",
  authMiddleware,
  roleMiddleware("seller"),
  sellerApprovalStatus,
  updateProduct
);

router.get(
  "/products/seller",
  authMiddleware,
  roleMiddleware("seller"),
  sellerApprovalStatus,
  getProductBySeller
);

router.get("/product/:id", getProductById);

router.delete(
  "/product/:id",
  authMiddleware,
  roleMiddleware("seller"),
  sellerApprovalStatus,
  deleteProduct
);

module.exports = router;
