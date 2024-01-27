const express = require("express");
const protectectedResource = require("../middleware/protectectedResource");
const {
  getOrder,
  allOrders,
  createOrder,
  allUsers,
  editprofile,
} = require("../controllers/user_controller");

const router = express.Router();

router.put("/editprofile", protectectedResource, editprofile);
router.get("/getorder/:id", protectectedResource, getOrder);
router.post("/createorder/:id", protectectedResource, createOrder);
router.get("/allorders", protectectedResource, allOrders);
router.get("/allusers", protectectedResource, allUsers);

module.exports = router;
