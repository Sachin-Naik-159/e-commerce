const express = require("express");
const protectectedResource = require("../middleware/protectectedResource");
const { checkout } = require("../controllers/payment_controller");

const router = express.Router();

router.post("/checkout-session", checkout);

module.exports = router;
