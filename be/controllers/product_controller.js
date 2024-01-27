const ProductModel = require("../models/product_model");

//Set undefined
const setUndef = (data) => {
  if (data === null || data === "" || data === "null") {
    data = undefined;
  }
  return data;
};

//Create a product
const addProduct = async (req, res) => {
  try {
    if (req.user.isAdmin) {
      const {
        name,
        price,
        quantity,
        catagory,
        subcatagory,
        description,
        image,
      } = req.body;
      const newProduct = new ProductModel({
        name,
        price,
        quantity,
        catagory,
        subcatagory: setUndef(subcatagory),
        description: setUndef(description),
        image: setUndef(image),
      });

      //Finding similar product
      const found = await ProductModel.findOne({
        name,
        price,
        catagory,
        subcatagory,
      });
      if (found === null) {
        const resp = await newProduct.save({ omitUndefined: true });
        res.status(201).json({ message: "Product Created", resp });
      } else res.status(200).json({ message: "Product Exhist", found });
    } else res.status(200).json({ message: "NotAdmin" });
  } catch (err) {
    throw err;
  }
};

//Rate a product
const rateProduct = async (req, res) => {
  try {
    const _id = req.params.id;
    const user = req.user._id;
    const { comment, rate } = req.body;
    let productInDB = await ProductModel.findOne({ _id });
    let rating = productInDB.rating;
    let found = rating.find((data) => {
      return (
        data.ratedBy.toString().replace(/ObjectId\("(.*)"\)/, "$1") ===
        user.toString().replace(/ObjectId\("(.*)"\)/, "$1")
      );
    });
    if (!found) {
      const newRating = {
        ratedBy: user,
        comment: comment,
        rate: rate,
      };
      let resp = await ProductModel.findOneAndUpdate(
        { _id },
        { $push: { rating: newRating } },
        { new: true }
      ).exec();
      res.status(200).json({ message: "Rated", resp });
    } else {
      res.status(200).json({ message: "Already Rated", found });
    }
  } catch (err) {
    throw err;
  }
};

//Edit a product
const editProduct = async (req, res) => {
  try {
    let { quantity } = req.body;
    const _id = req.params.id;
    let resp = await ProductModel.findOneAndUpdate(
      { _id },
      { $set: { quantity: quantity } },
      { new: true }
    ).exec();
    res.status(200).json({ message: "Edit Success", resp });
  } catch (err) {
    throw err;
  }
};

//Delete a product
const deleteProduct = async (req, res) => {
  try {
    if (req.user.isAdmin) {
      const _id = req.params.id;
      let resp = await ProductModel.findOneAndDelete({ _id });
      if (resp === null) {
        res.json({ message: "No Product", resp });
      } else res.status(200).json({ message: "Deleated Product", resp });
    } else res.json({ message: "No Auth" });
  } catch (err) {
    throw err;
  }
};

//Get a product
const getProduct = async (req, res) => {
  try {
    const _id = req.params.id;
    let productInDB = await ProductModel.findOne({ _id }).populate({
      path: "rating",
      populate: {
        path: "ratedBy",
        model: "UserModel",
        select: "username",
      },
    });
    res.status(200).json(productInDB);
  } catch (err) {
    throw err;
  }
};

//Get all products
const getAllProduct = async (req, res) => {
  try {
    let query = setUndef(req.params.query);
    if (query !== undefined) {
      query = {
        $or: [
          { catagory: req.params.query },
          { subcatagory: req.params.query },
          { name: new RegExp(req.params.query, "i") },
        ],
      };
    }
    let count = (await ProductModel.find(query)).length;
    let products = await ProductModel.find(query)
      .limit(req.params.limit)
      .skip(req.params.skip);
    res.json({ count: count, products: products });
  } catch (err) {
    throw err;
  }
};

//Get all catagory
const getCatagory = async (req, res) => {
  let products = await ProductModel.find();
  let catagory = products.map((p) => p.catagory);
  let subcatagory = products.map((p) => p.subcatagory);
  res.json({
    catagory: [...new Set(catagory)],
    subcatagory: [...new Set(subcatagory)],
  });
};

module.exports = {
  addProduct,
  editProduct,
  deleteProduct,
  getProduct,
  getAllProduct,
  rateProduct,
  getCatagory,
};
