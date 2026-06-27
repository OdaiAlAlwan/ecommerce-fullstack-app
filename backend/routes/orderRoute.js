const express = require("express");

const {
  createCashOrder,
  filterOrderForLoggedUser,
  findAllOrders,
  findSpecificOrder,
  simulateCheckout,
// eslint-disable-next-line import/no-unresolved
} = require("../controller/orderController");

const authController = require("../controller/AuthController");

const router = express.Router();

router.use(authController.protect);

router.post(
  '/simulate-checkout/:cartId',
  authController.allowedTo('user'),
  simulateCheckout
);

router.route("/:cartId").post(createCashOrder);

router.get(
  "/",
  authController.allowedTo("user", "manager", "admin"),
  filterOrderForLoggedUser,
  findAllOrders
);

router.get(
  "/:id",
  filterOrderForLoggedUser,
  findSpecificOrder
);

//   .delete(
//   );

module.exports = router;
