const Product = require("../model/productModel");
const Seller = require("../model/sellerModel");

const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const validCategories = [
      "electronics",
      "clothing",
      "books",
      "furniture",
      "kitchen",
    ];

    if (!validCategories) {
      res.status(404).json({ message: "Not a valid category" });
    }

    const products = await Product.findOne({ productCategory: category })
      .populate("seller", "shopName status")
      .equals("approved");

    res.status(200).json({
      success: true,
      category,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
