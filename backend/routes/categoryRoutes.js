const express = require("express");
const { getProductsByCategory, getAllCategories } = require("../controller/categoryController")
const router = express.Router()

router.get("/:category", getProductsByCategory)
router.get("/", getAllCategories)

module.exports = router