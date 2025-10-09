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
      "toys",
      "beauty",
      "health",
      "sports",
      "outdoors",
      "automotive",
      "jewelry",
      "footwear",
      "groceries",
      "petSupplies",
      "stationery",
      "homeDecor",
      "gaming",
      "babyProducts",
      "appliances",
      "music",
      "tools",
    ];

    if (!validCategories.includes(category)) {
      return res.status(404).json({ message: "Not a valid category" });
    }

    const products = await Product.find({ productCategory: category }).populate(
      {
        path: "seller",
        select: "shopName status",
        match: { status: "approved" },
      }
    );

    const filteredProducts = products.filter((p) => p.seller !== null);

    res.status(200).json({
      success: true,
      category,
      count: filteredProducts.length,
      products: filteredProducts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const getAllCategories = (req, res) => {
  const categories = [
    "electronics",
    "clothing",
    "books",
    "furniture",
    "kitchen",
    "toys",
    "beauty",
    "health",
    "sports",
    "outdoors",
    "automotive",
    "jewelry",
    "footwear",
    "groceries",
    "petSupplies",
    "stationery",
    "homeDecor",
    "gaming",
    "babyProducts",
    "appliances",
    "music",
    "tools",
  ];
  res.status(200).json({ success: true, categories });
};

module.exports = { getProductsByCategory, getAllCategories };
