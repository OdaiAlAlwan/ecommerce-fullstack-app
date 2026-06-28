const express = require("express");

const {
  getCategories,
  createCategory,
  getCategoryByid,
  UpdateCategoryByid,
  deleteCategoryByid,
  uploadCategoryImage,
  resizeImage,
} = require("../controller/CategoryController");

const authController = require("../controller/AuthController");

const router = express.Router();

router
  .route("/")
  .get(getCategories)
  .post(
    authController.protect,
    authController.allowedTo("admin"),
    uploadCategoryImage,
    resizeImage,
    createCategory
  );

router
  .route("/:id")
  .get(getCategoryByid)
  .put(
    authController.protect,
    authController.allowedTo("admin"),
    uploadCategoryImage,
    resizeImage,
    UpdateCategoryByid
  )
  .delete(
    authController.protect,
    authController.allowedTo("admin"),
    deleteCategoryByid
  );

module.exports = router;
