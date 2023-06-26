const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    price: {
        type: Number,
        trim: true,
      },
    desc: {
      type: String,
      trim: true,
    },
    category: {
        type: Number,
        trim: true,
      },
    imgURL: {
      type: String,
      trim: true,
    },
    seller: {
      type: ObjectId,
      ref: "seller",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);