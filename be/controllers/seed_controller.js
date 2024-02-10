const UserModel = require("../models/user_model");
const ProductModel = require("../models/product_model");
const bcrypt = require("bcryptjs");
let data = require("./db/products").products;

//Hashing password
const hashPass = async (pass) => {
  try {
    return await bcrypt.hash(pass, 10);
  } catch (err) {
    throw err;
  }
};

//SeedUser
const seedUsers = async (req, res) => {
  try {
    const found = await UserModel.findOne({ email: "admin@admin.com" });
    if (!found) {
      const admin = {
        name: "admin",
        username: "Root",
        email: "admin@admin.com",
        password: await hashPass("admin"),
        isAdmin: true,
      };
      const user = {
        name: "user",
        username: "Lucky",
        email: "user@user.com",
        password: await hashPass("user"),
      };
      const resp = await UserModel.create([admin, user]);
      res.status(201).json({ message: "User Created", resp });
    } else {
      found.password = "admin";
      res.status(400).json({ message: "Already Created", found });
    }
  } catch (err) {
    throw err;
  }
};

//SeedProducts
const seedProducts = async (req, res) => {
  try {
    const found = await ProductModel.findOne({ name: "Black Shirt" });
    if (!found) {
      const resp = await ProductModel.create([
        ...data.shirts,
        ...data.top,
        ...data.hoodie,
        ...data.dress,
        ...data.pants,
        ...data.jeans,
        ...data.kid,
      ]);
      res.status(201).json({ message: "Products Created", resp });
    } else {
      res.status(400).json({ message: "Already Created", found });
    }
  } catch (err) {
    throw err;
  }
};

module.exports = { seedUsers, seedProducts };
