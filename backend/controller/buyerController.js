const User = require("../model/authModel");
const Product = require("../model/productModel");
const Buyer = require("../model/buyerModel");

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "buyer") {
      res.status(403).json({ message: "Not a buyer!" });
    }

    res.status(200).json({ successs: true, profile: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = req.user.id;

    const updateUser = await User.findByIdAndUpdate(
      user,
      { name, email },
      { new: true, runValidators: true }
    );

    if (!updateUser) {
      res.status(403).json({ message: "User not found" });
    }

    res.status(201).json({ success: true, updateUser: updateUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

//Products

const getAllProducts = async (req, res) => {
  try {
    const product = await Product.find()
      .populate("seller", "shopName number address")
      .where("seller.status", "approved");

    res.status(200).json({
      success: true,
      count: product.length,
      product,
    });
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
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.seller.status !== "approved") {
      return res.status(403).json({ message: "Status not approved!" });
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const addCartItems = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({ message: "Quantity must be more than 0" });
    }

    const product = await Product.findById(productId).populate(
      "seller",
      "status"
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    if (product.seller.status !== "approved") {
      return res.status(403).json({ message: "Seller status not approved" });
    }

    let buyer = await Buyer.findOne({ user: req.user.id });

    if (!buyer) {
      buyer = new Buyer({ user: req.user.id, cart: [] });
    }

    const existingItem = buyer.cart.findIndex(
      (item) => item.product.toString() === productId
    );

    if (existingItem !== -1) {
      buyer.cart[existingItem].quantity += quantity;
    } else {
      buyer.cart.push({ product: productId, quantity });
    }

    await buyer.save();
    await buyer.populate({
      path: "cart.product",
      select: "productName productPrice stockQuantity",
    });

    res.status(200).json({ success: true, cart: buyer.cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const getCart = async (req, res) => {
  try {
    const buyer = await Buyer.findOne({ user: req.user.id }).populate(
      "cart.product",
      "productName productPrice productCategory stockQuantity"
    );

    if (!buyer) {
      res.status(404).json({ message: "Not a buyer" });
    }

    if (!buyer.cart || buyer.cart.length === 0) {
      return res.status(200).json({ success: true, cart: [], total: 0 });
    }

    const total = buyer.cart.reduce((acc, curr) => {
      return acc + item.product.productPrice * item.quantity;
    });

    res.status(200).json({ success: true, cart: buyer.cart, total });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const updateCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (quantity < 1) {
      res.status(400).json({ message: "Quantity must be at least 1" });
    }

    const buyer = await Buyer.findOne({ user: req.user.id }).populate(
      "cart.product",
      "productName productPrice stockQuantity"
    );

    if (!buyer) {
      res.status(404).json("Buyer not found!");
    }

    if (!buyer.cart || buyer.cart.length === 0) {
      res.status(404).json("Nothing to update");
    }

    const itemIndex = buyer.cart.findIndex(
      (item) => item.product._id.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Product not in cart" });
    }

    buyer.cart[itemIndex].quantity = quantity;

    await buyer.save();

    const total = buyer.cart.reduce((acc, item) => {
      return acc + item.product.productPrice * quantity;
    });

    res.status(200).json({
      success: true,
      cart: buyer.cart,
      total,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  getAllProducts,
  getProductById,
  addCartItems,
  getCart,
  updateCart,
};
