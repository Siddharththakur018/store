const Seller = require("../model/sellerModel");
const User = require("../model/authModel");
const Product = require("../model/productModel");
const mongoose = require('mongoose')

const sellerProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user || user.role !== "seller") {
      return res.status(404).json({ message: "Not a seller!" });
    }

    const seller = await Seller.findOne({ user: user._id });
    if (!seller) {
      return res.status(404).json({ message: "Seller profile not found!" });
    }

    res.status(200).json({ success: true, user, seller });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const updateSellerProfile = async (req, res) => {
  try {
    const { name, email, shopName, mobileNumber, address } = req.body;

    const updateUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, email },
      { new: true, runValidators: true, select: "-password" }
    );

    if (!updateUser || updateUser.role !== "seller") {
      res.status(404).json({ message: "Not a seller!" });
    }

    const updateSeller = await Seller.findOneAndUpdate(
      { user: req.user.id },
      { shopName, mobileNumber, address },
      { new: true, runValidators: true }
    );

    if (!updateSeller) {
      res.status(404).json({ message: "Seller profile not found" });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updateUser,
      seller: updateSeller,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    console.log("Request received:", req.body);

    const seller = await Seller.findOne({ user: req.user.id });
    console.log("Seller found:", seller);

    if (!seller) {
      console.log("Seller not found for user:", req.user.id);
      return res.status(404).json({ message: "Seller profile not found!" });
    }

    if (seller.status !== "approved") {
      console.log("Seller not approved:", seller.status);
      return res.status(403).json({ message: "Not approved" });
    }

    const newProduct = new Product({
      seller: seller._id,
      productName: req.body.productName,
      productDesc: req.body.productDesc,
      productPrice: req.body.productPrice,
      productCategory: req.body.productCategory,
      stockQuantity: req.body.stockQuantity,
      imageUrl: req.body.imageUrl,
    });

    console.log("New product to save:", newProduct);

    await newProduct.save();

    console.log("Product saved successfully:", newProduct);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: error.message });
  }
};


const getAllProducts = async (req, res) => {
  try {
    // First, find all approved sellers
    const approvedSellers = await mongoose.model('Seller').find(
      { status: "approved" },
      '_id'
    );
    
    const approvedSellerIds = approvedSellers.map(seller => seller._id);

    // Then find products from those sellers
    const products = await Product.find({
      seller: { $in: approvedSellerIds }
    }).populate({
      path: "seller",
      select: "shopName mobileNumber address status",
    });

    res.status(200).json({
      success: true,
      count: products.length,
      product: products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const {
      productName,
      productDesc,
      productPrice,
      productCategory,
      stockQuantity,
    } = req.body;

    const productId = req.params.id;
    const seller = await Seller.findOne({ user: req.user._id });
    if (!seller || seller.status !== "approved") {
      return res.status(403).json({ message: "Not approved seller" });
    }

    const updateProduct = await Product.findOneAndUpdate(
      { _id: productId, seller: seller._id },
      {
        productName,
        productDesc,
        productPrice,
        productCategory,
        stockQuantity,
        imageUrl: req.body.imageUrl, 
      },
      { new: true, runValidators: true }
    );

    res.status(200).json(updateProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const seller = await Seller.findOne({ user: req.user._id });
    if (!seller || seller.status !== "approved") {
      return res.status(403).json({ message: "Not approved seller" });
    }

    const product = await Product.findOne({ _id: productId, seller: sellerId });

    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    await product.deleteOne();

    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const getProductBySeller = async (req, res) => {
  try {
    if (req.user.role !== "seller") {
      return res.status(404).json({ messgae: "Not a seller!" });
    }

    const seller = await Seller.findOne({ user: req.user._id });
    if (!seller) {
      return res.status(404).json({ message: "Seller not found!" });
    }

    if (seller.status !== "approved") {
      return res.status(403).json({ message: "Not approved yet!" });
    }

    const products = await Product.find({ seller: seller._id });

    res.status(200).json({ success: true, count: products.length, products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId).populate(
      "seller",
      "shopName status"
    );

    if (!product) {
      return res.status(404).json("Product not Found!");
    }

    if (!product.seller || product.seller.status !== "approved") {
      return res.status(403).json("Seller status not approved");
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  sellerProfile,
  updateSellerProfile,
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductBySeller,
  getProductById,
};
