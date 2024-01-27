const express = require("express");
const { seedUsers, seedProducts } = require("../controllers/seed_controller");

const router = express.Router();

router.post("/seedUsers", seedUsers);
router.post("/seedProducts", seedProducts);

module.exports = router;
