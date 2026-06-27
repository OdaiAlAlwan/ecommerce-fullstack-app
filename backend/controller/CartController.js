const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");
const Cart = require("../models/CartModel");
const Product = require("../models/ProductModel");

const calcTotalCartPrice = (cart) => {
  let totalPrice = 0;
  cart.cartItems.forEach((item) => {
    totalPrice += item.quantity * item.price;
  });
  cart.totalCartPrice = totalPrice.toFixed(2);
  cart.totalPriceAfterDiscount = undefined;

  return totalPrice;
};

// @desc    Add product to  cart
// @route   POST /api/v1/cart
// @access  Private/User
exports.addProductToCart = asyncHandler(async (req, res, next) => {
  const { productId, color } = req.body;

  const product = await Product.findById(productId);

  // 1 Get Cart for Logged user
  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    // create cart fot logged user with product
    cart = await Cart.create({
      user: req.user._id,
      cartItems: [{ product: productId, color, price: product.price }],
    });
  } else {
    // product exist in cart, update product quantity
    const productIndex = cart.cartItems.findIndex(
      (item) => item.product.toString() === productId && item.color === color,
    );

    if (productIndex > -1) {
      const cartItem = cart.cartItems[productIndex];
      cartItem.quantity += 1;

      cart.cartItems[productIndex] = cartItem;
    } else {
      // product not exist in cart,  push product to cartItems array
      cart.cartItems.push({ product: productId, color, price: product.price });
    }
  }

  let totalQuantity = 0;

  // Loop through each item in the cartItems array and sum up their quantities
  cart.cartItems.forEach((item) => {
    totalQuantity += item.quantity;
  });

  calcTotalCartPrice(cart);

  await cart.save();

  res.status(200).json({
    status: "success",
    message: "Successfully added the product quantity to your cart",
    numOfCartItems: totalQuantity,
    data: cart,
  });
});

// @desc    Get logged user cart
// @route   GET /api/v1/cart
// @access  Private/User
exports.getLoggedUserCart = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate({
    path: "cartItems.product",
    select: "title imageCover price ratingsAverage category ",
    populate: {
      path: "category",
      select: "name -_id",
    },
  });

  if (!cart) {
    return next(new ApiError(`There is no cart for you`, 404));
  }

  let totalQuantity = 0;

  // Loop through each item in the cartItems array and sum up their quantities
  cart.cartItems.forEach((item) => {
    totalQuantity += item.quantity;
  });

  res.status(200).json({
    status: "success",
    numOfCartItems: totalQuantity,
    data: cart,
  });
});

// @desc    Remove specific cart item
// @route   DELETE /api/v1/cart/:itemId
// @access  Private/User
exports.removeSpecificCartItem = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOneAndUpdate(
    { user: req.user._id },
    {
      $pull: { cartItems: { _id: req.params.itemId } },
    },
    { new: true },
  );

  let totalQuantity = 0;

  // Loop through each item in the cartItems array and sum up their quantities
  cart.cartItems.forEach((item) => {
    totalQuantity += item.quantity;
  });

  calcTotalCartPrice(cart);
  cart.save();

  res.status(200).json({
    status: "success",
    numOfCartItems: totalQuantity,
    data: cart,
  });
});

// @desc    clear logged user cart
// @route   DELETE /api/v1/cart
// @access  Private/User
exports.clearCart = asyncHandler(async (req, res, next) => {
  await Cart.findOneAndDelete({ user: req.user._id });
  res.status(204).send();
});

// @desc    Update specific cart item quantity
// @route   PUT /api/v1/cart/:itemId
// @access  Private/User
exports.updateCartItemQuantity = asyncHandler(async (req, res, next) => {
  const { quantity } = req.body;
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    return next(new ApiError(`there is no cart for user ${req.user._id}`, 404));
  }
  const itemIndex = cart.cartItems.findIndex(
    (item) => item._id.toString() === req.params.itemId,
  );
  if (itemIndex > -1) {
    const cartItem = cart.cartItems[itemIndex];
    cartItem.quantity = quantity;
    cart.cartItems[itemIndex] = cartItem;
  } else {
    return next(
      new ApiError(`there is no item for this id :${req.params.itemId}`, 404),
    );
  }

  let totalQuantity = 0;

  // Loop through each item in the cartItems array and sum up their quantities
  cart.cartItems.forEach((item) => {
    totalQuantity += item.quantity;
  });

  calcTotalCartPrice(cart);
  await cart.save();

  res.status(200).json({
    status: "success",
    message: "Successfully update the product quantity to your cart",
    numOfCartItems: totalQuantity,
    data: cart,
  });
});


