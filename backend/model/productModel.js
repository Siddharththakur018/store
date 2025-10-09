const mongoose = require("mongoose");
const slugify = require("slugify");
const crypto = require("crypto");

const productSchema = mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
    },
    productName: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    productDesc: {
      type: String,
      required: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    productCategory: {
      type: String,
      enum: [
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
      ],
      required: true,
    },
    stockQuantity: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Generate a slug with a short random string to ensure uniqueness
function generateUniqueSlug(name) {
  const baseSlug = slugify(name, { lower: true, strict: true });
  const uniqueString = crypto.randomBytes(3).toString("hex"); // 6 chars
  return `${baseSlug}-${uniqueString}`;
}

// Pre-save hook
productSchema.pre("save", function (next) {
  if (this.isModified("productName")) {
    this.slug = generateUniqueSlug(this.productName);
  }
  next();
});

module.exports = mongoose.model("Product", productSchema);
