const express = require("express");

const {
  getProducts,
  getProductByid,
  createProduct,
  updateProductByid,
  deleteProductByid,
  uploadProductImage,
  resizeProductImages,
} = require("../controller/ProductController");
const {
  createProductValidator,
  getProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require("../utils/ProductValidator");

const authController = require("../controller/AuthController");

const router = express.Router();


router
  .route("/")
  .get(getProducts)
  .post(
    authController.protect,
    authController.allowedTo("admin"),
    uploadProductImage,
    resizeProductImages,
    createProductValidator,
    createProduct
  );

router
  .route("/:id")
  .get(getProductValidator, getProductByid)
  .put(
    authController.protect,
    authController.allowedTo("admin"),
    uploadProductImage,
    resizeProductImages,
    updateProductValidator,
    updateProductByid
  )
  .delete(
    authController.protect,
    authController.allowedTo("admin"),
    deleteProductValidator,
    deleteProductByid
  );

module.exports = router;
