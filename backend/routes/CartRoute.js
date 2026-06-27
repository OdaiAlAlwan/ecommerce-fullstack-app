const express = require("express");

const {
  addProductToCart,
  getLoggedUserCart,
  removeSpecificCartItem,
  clearCart,
  updateCartItemQuantity
// eslint-disable-next-line import/no-unresolved
} = require("../controller/cartController");

const authController = require("../controller/AuthController");

const router = express.Router();

router.use(authController.protect);
// router.use(authController.protect, authController.allowedTo("user"));

router
  .route("/")
  .post(addProductToCart)
  .get(getLoggedUserCart)
  .delete(clearCart);


router
  .route("/:itemId")
  .put(updateCartItemQuantity)
  .delete(removeSpecificCartItem);

module.exports = router;
