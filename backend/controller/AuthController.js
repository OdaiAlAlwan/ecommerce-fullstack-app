const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");
const UserModel = require("../models/UserModel");
const sendEmail = require("../utils/sendEmail");


const createToken = (payload) =>
  jwt.sign({ userId: payload , role : payload }, process.env.JWT_TOKEN, {
    expiresIn: '1d',
  });

const refreshToken = (payload) =>
  jwt.sign({ userId: payload }, process.env.JWT_TOKEN_REFRESH, {
    expiresIn: '1d',
  });

  

  



// @desc    Signup
// @route   post /api/v1/auth/signup
// @access  Public
exports.signup = asyncHandler(async (req, res, next) => {
  // 1 - Create user

  const user = await UserModel.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  const token = createToken(user._id);

  res.status(201).json({ data: user, token });
});

// @desc    login
// @route   post /api/v1/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findOne({
    email: req.body.email,
  });

  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new ApiError("Incorrect email or password", 401));
  }

  const token = createToken(user._id,user.role);

  const reToken = refreshToken(user._id)

  res.cookie("Token", reToken, {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    httpOnly: true
  });


  res.status(201).json({ message : " logged in successfully "   , data: user, token });
});





exports.refreshToken = asyncHandler(async (req, res, next) => {
  const  cookies  = req.cookies;


  if (!cookies.Token) {
    return next(new ApiError("You are not logged in", 401));
  }

  const reToken = cookies.Token

  jwt.verify(
    reToken,
    process.env.JWT_TOKEN_REFRESH,
    async (err, decoded) => {
      if (err) return next(new ApiError("there is error from decoded token", 403));

      const fondUser = await UserModel.findById({ _id: decoded.userId });

      if (!fondUser) return next(new ApiError("Unauthorized", 401));

      const token = createToken(fondUser._id, fondUser.role);

      res.json({ token });
    }
  );
});





exports.LogOut = asyncHandler(async (req, res, next) => {
  const cookies  = req.cookies;
  
  if (!cookies.Token) {
    return next(new ApiError('Not logged out Try again',204));
  }

  res.clearCookie("Token", {httpOnly : true});
  return res.json({ message :  'logged out successfully' , status: true });
});


exports.protect = asyncHandler(async (req, res, next) => {
  // 1) Check if token exist, if exist get

  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(
      new ApiError(
        "You are not login, Please login to get access this route",
        401
      )
    );
  }
  // 2) Verify token (no change happens, expired token)
  const decoded = jwt.verify(token, process.env.JWT_TOKEN);
  // 3) Check if user exists

  const currentUser = await UserModel.findById(decoded.userId);

  if (!currentUser) {
    return next(
      new ApiError(
        "The user that belong to this token does no longer exist",
        401
      )
    );
  }
  // 4) Check if user change his password after token created
  if (currentUser.passwordChangedAt) {
    const passChangedTimestamp = parseInt(
      currentUser.passwordChangedAt.getTime() / 1000,
      10
    );

    // Password changed after token created (Error)
    if (passChangedTimestamp > decoded.iat) {
      return next(
        new ApiError(
          "User recently changed his password. please login again..",
          401
        )
      );
    }
  }

  req.user = currentUser;

  next();
});

exports.allowedTo = (...roles) =>
  asyncHandler(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError("you are not allowed to access this route", 403)
      );
    }
    next();
  });

exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findOne({
    email: req.body.email,
  });

  if (!user) {
    return next(new ApiError("if User not found", 404)); // If you are registered in the application, you will receive an email. Check your email
  }

  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

  const hashedResetCode = crypto
    .createHash("sha256")
    .update(resetCode)
    .digest("hex");

  user.passwordResetCode = hashedResetCode;
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
  user.passwordResetVerified = false;

  await user.save();

  const message = `Hi ${user.name},\n We received a request to reset the password on your E-shop Account. 
    \n ${resetCode} \n Enter this code to complete the reset. \n Thanks for helping us keep your account secure.
    \n The E-commerce Team`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset code (valid for 10 min)",
      message,
    });
  } catch (err) {
    user.passwordResetCode = undefined;
    user.passwordResetExpires = undefined;
    user.passwordResetVerified = undefined;

    await user.save();

    return next(new ApiError("There is an error in sending email", 500));
  }

  res
    .status(200)
    .json({ status: "Success", message: "Reset code sent to email" });
});

// @desc    Verify password reset code
// @route   POST /api/v1/auth/verifyResetCode
// @access  Public

exports.verifyPasswordResetCode = asyncHandler(async (req, res, next) => {
  // Get user based on reset code
  const hashedResetCode = crypto
    .createHash("sha256")
    .update(req.body.resetCode)
    .digest("hex");

  const user = await UserModel.findOne({
    passwordResetCode: hashedResetCode,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ApiError("Reset code invalid or expired"));
  }

  user.passwordResetVerified = true;
  await user.save();

  res.status(200).json({
    status: "Success",
  });
});

// @desc    Reset password
// @route   POST /api/v1/auth/resetPassword
// @access  Public

exports.resetPassword = asyncHandler(async (req, res, next) => {
  // Get user based on email

  const user = await UserModel.findOne({ email: req.body.email });

  if (!user) {
    return next(
      new ApiError(`There is no user with email ${req.body.email}`, 404)
    );
  }

  // 2) Check if reset code verified

  if (!user.passwordResetVerified) {
    return next(new ApiError("Reset code not verified", 400));
  }

  user.password = req.body.newPassword;
  user.passwordResetCode = undefined;
  user.passwordResetExpires = undefined;
  user.passwordResetVerified = undefined;

  await user.save();

  // 3) if everything is ok, generate token
  const token = createToken(user._id);
  res.status(200).json({ token });
});
