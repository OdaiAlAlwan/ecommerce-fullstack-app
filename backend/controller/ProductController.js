const sharp = require("sharp");
const asyncHandler = require("express-async-handler");
const { uploadMixOfImages } = require("../middlewares/uoloadImagemiddleware");
const ProductModel = require("../models/ProductModel");
const factory = require("./handlerFactory");

exports.uploadProductImage = uploadMixOfImages([
  { name: "imageCover", maxCount: 1 },
  { name: "images", maxCount: 5 },
]);


exports.resizeProductImages = asyncHandler(async (req, res, next) => {
    //1- Image processing for imageCover
    if(req.files.imageCover) {
      const imageCoverFileName = `product-${Math.round(Math.random() * 1e9)}-${Date.now()}-cover.jpeg`;
  
      await sharp(req.files.imageCover[0].buffer)
        .resize(600, 600)
        .toFormat('jpeg')
        .jpeg({ quality: 95 })
        .toFile(`uploads/products/${imageCoverFileName}`);
  
      // Save image into our db
      req.body.imageCover = imageCoverFileName;
    }
    //2- Image processing for images
    if (req.files.images) {
      req.body.images = [];
      await Promise.all(
        req.files.images.map(async (img, index) => {
          const imageName = `product-${Math.round(Math.random() * 1e9)}-${Date.now()}-${index + 1}.jpeg`;
  
          await sharp(img.buffer)
            .resize(600, 600)
            .toFormat('jpeg')
            .jpeg({ quality: 95 })
            .toFile(`uploads/products/${imageName}`);
  
          // Save image into our db
          req.body.images.push(imageName);
        })
      );
      next();
    }
});











// @desc    Get list of Product
// @route   Get /api/v1/product
// @access  Public
exports.getProducts = factory.getAll(ProductModel, "Products");
// @desc    GET product by ID
// @route   GET /api/v1/product/:id
// @access  Public
exports.getProductByid = factory.getOneById(ProductModel);
// @desc    Post create  product
// @route   Post /api/v1/product
// @access  Priavte
exports.createProduct = factory.createOne(ProductModel);
// @desc    update product by ID
// @route   put /api/v1/product/:id
// @access  Priavte
exports.updateProductByid = factory.updateOne(ProductModel);
// @desc    delete product by ID
// @route   put /api/v1/product/:id
// @access  Priavte
exports.deleteProductByid = factory.deleteOne(ProductModel);
