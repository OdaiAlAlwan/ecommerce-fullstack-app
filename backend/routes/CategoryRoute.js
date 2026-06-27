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
const {
  getCategroyValidator,
  createCategroyValidator,
  updateCategroyValidator,
  deleteCategroyValidator,
} = require("../utils/categoryValidator");

const authController = require("../controller/AuthController");

const router = express.Router();

router
  .route("/")
  .get(getCategories)
  .post(
    authController.protect,
    authController.allowedTo("manager", "admin"),
    uploadCategoryImage,
    resizeImage,
    createCategroyValidator,
    createCategory
  );

router
  .route("/:id")
  .get(getCategroyValidator, getCategoryByid)
  .put(
    authController.protect,
    authController.allowedTo("manager", "admin"),
    uploadCategoryImage,
    resizeImage,
    updateCategroyValidator,
    UpdateCategoryByid
  )
  .delete(
    authController.protect,
    authController.allowedTo("admin"),
    deleteCategroyValidator,
    deleteCategoryByid
  );

module.exports = router;
