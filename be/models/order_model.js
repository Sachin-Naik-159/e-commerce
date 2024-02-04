const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const Schema = mongoose.Schema;
const orderSchema = new Schema(
  {
    custId: { type: ObjectId, ref: "UserModel" },
    amount: {
      type: Number,
      required: true,
    },
    pay_method: {
      type: String,
      required: true,
    },
    deal_status: {
      type: String,
      default: "Not Paid",
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    products: [
      {
        productId: { type: ObjectId, required: true, ref: "ProductModel" },
        quantity: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("OrderModel", orderSchema);
module.exports = OrderModel;
