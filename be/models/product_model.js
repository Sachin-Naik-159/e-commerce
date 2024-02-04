const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const Schema = mongoose.Schema;
const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    inCart: {
      type: Number,
      default: 0,
    },
    catagory: {
      type: String,
      required: true,
    },
    subcatagory: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      default: "high quality product",
    },
    image: {
      type: String,
      default:
        "https://unsplash.com/photos/brown-cardboard-box-on-white-surface-5gSAWojmSpQ",
    },
    rating: [
      {
        ratedBy: { type: ObjectId, ref: "UserModel" },
        comment: { type: String },
        rate: { type: Number },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("ProductModel", productSchema);
module.exports = ProductModel;
