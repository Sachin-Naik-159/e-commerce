const UserModel = require("../models/user_model");
const ProductModel = require("../models/product_model");
const OrderModel = require("../models/order_model");

//Hashing password
const hashPass = async (pass) => {
  try {
    return await bcrypt.hash(pass, 10);
  } catch (err) {
    throw err;
  }
};

//Set undefined
const setUndef = (data) => {
  if (data === null || data === "" || data === "null") {
    data = undefined;
  }
  return data;
};

//Get order by id
const getOrder = async (req, res) => {
  try {
    const _id = req.params.id;
    let orderInDB = await OrderModel.findOne({ _id }).populate({
      path: "products",
      populate: {
        path: "productId",
        model: "ProductModel",
        select: "_id name price catagory image",
      },
    });
    res.status(200).json(orderInDB);
  } catch (err) {
    throw err;
  }
};

//Get all orders
const allOrders = async (req, res) => {
  try {
    let query = { custId: req.user._id };
    if (req.user.isAdmin) {
      query = {};
    }
    let ordersInDB = await OrderModel.find(query).populate({
      path: "custId",
      model: "UserModel",
      select: "_id username",
    });
    res.status(200).json(ordersInDB);
  } catch (err) {
    throw err;
  }
};

//Create order
const createOrder = async (req, res) => {
  try {
  } catch (err) {
    throw err;
  }
};

//Get all users
const allUsers = async (req, res) => {
  try {
    if (req.user.isAdmin) {
      let users = await UserModel.find().select(
        "_id name username email isAdmin"
      );
      res.status(200).json(users);
    } else res.json({ message: "Not Auth" });
  } catch (err) {
    throw err;
  }
};

//Edit Profile
const editprofile = async (req, res) => {
  try {
    let { name, username, password } = req.body;
    let _id = req.user._id;
    if (password === "") {
      password = undefined;
    } else {
      password = await hashPass(password);
    }
    let resp = await UserModel.findOneAndUpdate(
      { _id },
      {
        $set: {
          name: setUndef(name),
          username: setUndef(username),
          password: password,
        },
      },
      { omitUndefined: true, new: true }
    ).exec();
    res.status(200).json({ message: "Edit Success", resp });
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getOrder,
  allOrders,
  createOrder,
  allUsers,
  editprofile,
};
