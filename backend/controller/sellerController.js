const Seller = require("../model/sellerModel");
const User = require("../model/authModel");
const Product = require("../model/productModel");

const sellerProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user || user.role !== "seller") {
      res.status(404).json({ message: "Not a seller!" });
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

    const updateSeller = await Seller.findByIdAndUpdate(
      req.user.id,
      { shopName, mobileNumber, address },
      { new: true, runValidators: true }
    );

    if (!updateSeller) {
      res.status(404).json({ message: "Seller profile not found" });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updateSeller,
      seller: updateUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const seller = await Seller.findOne({ user: req.user.id });

    if (!seller) {
      res.status(404).json({ message: "Seller profile not foumd!" });
    }

    if (seller.status !== "approved") {
      res.status(403).json({ message: "Not approved" });
    }
    const newProduct = new Product({
      seller: seller._id,
      productName: req.body.productName,
      productDesc: req.body.productDesc,
      productPrice: req.body.productPrice,
      productCategory: req.body.productCategory,
      stockQuantity: req.body.stockQuantity,
    });
    await newProduct.save();
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const product = await Product.find.populate(
      "seller",
      "shopName mobileNumber"
    );
    res.status(200).json({
      success: true,
      count: products.length,
      products,
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
    const sellerId = req.user._id;

    const updateProduct = await Product.findOneAndUpdate(
      { _id: productId, seller: sellerId },
      {
        productName,
        productDesc,
        productPrice,
        productCategory,
        stockQuantity,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedProduct);
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
  updateProduct
};
