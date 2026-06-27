const sharp = require("sharp");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const UserModel = require("../models/UserModel");
const factory = require("./handlerFactory");
const { uploadSingleImage } = require("../middlewares/uoloadImagemiddleware");
const ApiError = require("../utils/ApiError");

const createToken = (payload) =>
  jwt.sign({ userId: payload }, process.env.JWT_TOKEN, {
    expiresIn: process.env.JWT_TOKEN_EX,
  });

// middleware uplod image
exports.uploadUserImage = uploadSingleImage("profileImage");

// resize middleware image
exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `user-${Math.round(Math.random() * 1e9)}-${Date.now()}.jpeg`;
  if (req.file) {
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`uploads/users/${filename}`);
    req.body.profileImage = filename;
  }
  next();
});

// @desc    Get list of User
// @route   Get /api/v1/User
// @access  Priavte
exports.getUser = factory.getAll(UserModel);
// @desc    GET User by ID
// @route   GET /api/v1/User/:id
// @access  Priavte
exports.getUserByid = factory.getOneById(UserModel);

// @desc    Post create User
// @route   Post /api/v1/User
// @access  Priavte
exports.createUser = factory.createOne(UserModel);

// @desc    update User by ID
// @route   put /api/v1/User/:id
// @access  Priavte
exports.updateUserByid = asyncHandler(async (req, res, next) => {
  const document = await UserModel.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      slug: req.body.slug,
      phone: req.body.phone,
      email: req.body.email,
      profileImg: req.body.profileImg,
      role: req.body.role,
    },
    {
      new: true,
    }
  );

  if (!document) {
    return next(new ApiError(`No document for this id ${req.params.id}`, 404));
  }
  res.status(200).json({ data: document });
});
// @desc    update User by ID
// @route   put /api/v1/User/changePassword/:id
// @access  Priavte
exports.changeUserPassword = asyncHandler(async (req, res, next) => {
  const document = await UserModel.findByIdAndUpdate(
    req.params.id,
    {
      password: await bcrypt.hash(req.body.password, 10),
      passwordChangedAt: Date.now(),
    },
    {
      new: true,
    }
  );

  if (!document) {
    return next(new ApiError(`No document for this id ${req.params.id}`, 404));
  }
  res.status(200).json({ data: document });
});

exports.deleteUserByid = factory.deleteOne(UserModel);

// @desc    GET User by ID
// @route   GET /api/v1/User/myProfile
// @access  Priavte/Protect
exports.getLoggedUserData = asyncHandler(async (req, res, next) => {
  req.params.id = req.user._id;

  next();
});


// @desc    Put update Logged User Password
// @route   GET /api/v1/User/updateUserPassword
// @access  Priavte/Protect
exports.updateLoggedUserPassword = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findByIdAndUpdate(
    req.user._id,
    {
      password: await bcrypt.hash(req.body.password, 10),
      passwordChangedAt: Date.now(),
    },
    {
      new: true,
    }
  );

  const token = createToken(user._id);
  res.status(200).json({ data: user, token });
});


// @desc    Put update Logged User data (name , email , phone .....)
// @route   GET /api/v1/User/updateProfileData
// @access  Priavte/Protect
exports.updateLoggedUserData = asyncHandler(async (req, res, next) => {
  const updatedUser = await UserModel.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    },
    { new: true }
  );

  res.status(200).json({ data: updatedUser });
})


// @desc    Deactivate logged user
// @route   DELETE /api/v1/user/deleteProfile
// @access  Private/Protect
exports.deleteLoggedUserData = asyncHandler(async (req, res, next) => {
  await UserModel.findByIdAndUpdate(req.user._id, { active: false });

  res.status(204).json({ status: 'Success' });
});





















// this solution if you want Create the directory if it doesn't exist
// destination: function (req, file, cb) {
//     const uploadDir = "uploads/User";
//     // Create the directory if it doesn't exist
//     fs.mkdir(uploadDir, { recursive: true }, (err) => {
//       if (err) {
//         console.error("Error creating directory:", err);
//       }
//       cb(null, uploadDir);
//     });
//   },

// // Diskstorage config  if don't need to resize image
// const Diskstorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/User");
//   },
//   filename: function (req, file, cb) {
//     const ext = file.mimetype.split("/")[1];
//     const filename = `User-${Math.round(Math.random() * 1e9)}-${Date.now()}.${ext}`;
//     cb(null, filename);
//   },
// });
