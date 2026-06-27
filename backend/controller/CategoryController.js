
const sharp = require('sharp')
const asyncHandler = require("express-async-handler");
const CategoryModel = require("../models/categoryModel");

const factory = require("./handlerFactory");

const { uploadSingleImage } = require("../middlewares/uoloadImagemiddleware");

// middleware uplod image
exports.uploadCategoryImage = uploadSingleImage("image");

// resize middleware image
exports.resizeImage = asyncHandler( async (req, res, next) => {
    const filename = `category-${Math.round(Math.random() * 1e9)}-${Date.now()}.jpeg`;

    if(req.file){
        await sharp(req.file.buffer)
        .resize(600 , 600)
        .toFormat('jpeg')
        .jpeg({quality : 90})
        .toFile(`uploads/category/${filename}`)
    
        req.body.image = filename
    
    }
    next()

})


// @desc    Get list of categories
// @route   Get /api/v1/categories
// @access  Public
exports.getCategories = factory.getAll(CategoryModel);
// @desc    GET category by ID
// @route   GET /api/v1/categories/:id
// @access  Public
exports.getCategoryByid = factory.getOneById(CategoryModel);

// @desc    Post create categories
// @route   Post /api/v1/categories
// @access  Priavte
exports.createCategory = factory.createOne(CategoryModel);

// @desc    update category by ID
// @route   put /api/v1/categories/:id
// @access  Priavte
exports.UpdateCategoryByid = factory.updateOne(CategoryModel);

exports.deleteCategoryByid = factory.deleteOne(CategoryModel);




// this solution if you want Create the directory if it doesn't exist
// destination: function (req, file, cb) {
//     const uploadDir = "uploads/category";
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
//     cb(null, "uploads/category");
//   },
//   filename: function (req, file, cb) {
//     const ext = file.mimetype.split("/")[1];
//     const filename = `category-${Math.round(Math.random() * 1e9)}-${Date.now()}.${ext}`;
//     cb(null, filename);
//   },
// });