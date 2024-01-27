const express = require("express");
const protectectedResource = require("../middleware/protectectedResource");
const {
  addProduct,
  editProduct,
  deleteProduct,
  getProduct,
  getAllProduct,
  rateProduct,
  getCatagory,
} = require("../controllers/product_controller");

const router = express.Router();

router.get("/getCatagory", getCatagory);
router.get("/allproducts/:query/:limit/:skip", getAllProduct);
router.put("/rate/:id", protectectedResource, rateProduct);
router
  .route("/:id")
  .post(protectectedResource, addProduct)
  .put(protectectedResource, editProduct)
  .delete(protectectedResource, deleteProduct)
  .get(getProduct);

module.exports = router;
