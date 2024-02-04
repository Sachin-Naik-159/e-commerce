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
router.post("/createorder", protectectedResource, createOrder);
router.get("/getorder/:id", protectectedResource, getOrder);
router.get("/allorders/:type", protectectedResource, allOrders);
router.get("/allusers", protectectedResource, allUsers);

module.exports = router;
