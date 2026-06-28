const express = require("express");

const {
  getBrands,
  getBrandByid,
  createBrand,
  updateBrandByid,
  deleteBrandId,
  uploadBrandImage,
  resizeImage,
} = require("../controller/BrandController");
const {
  getBrandValidator,
  createBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} = require("../utils/BrandValidator");

const authController = require("../controller/AuthController");

const router = express.Router();

router
  .route("/")
  .get(getBrands)
  .post(
    authController.protect,
    authController.allowedTo("admin"),
    uploadBrandImage,
    resizeImage,
    createBrandValidator,
    createBrand
  );

router
  .route("/:id")
  .get(getBrandValidator, getBrandByid)
  .put(
    authController.protect,
    authController.allowedTo("admin"),
    uploadBrandImage,
    resizeImage,
    updateBrandValidator,
    updateBrandByid
  )
  .delete(
    authController.protect,
    authController.allowedTo("admin"),
    deleteBrandValidator,
    deleteBrandId
  );

module.exports = router;
