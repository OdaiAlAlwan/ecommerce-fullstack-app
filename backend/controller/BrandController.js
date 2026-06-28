
const sharp = require('sharp')
const asyncHandler = require("express-async-handler");

const BrandModel = require("../models/BrandModel");
const factory = require("./handlerFactory");
const { uploadSingleImage } = require("../middlewares/uoloadImagemiddleware");

// middleware uplod image
exports.uploadBrandImage = uploadSingleImage("image");

// resize middleware image
exports.resizeImage = asyncHandler( async (req, res, next) => {
    const filename = `brand-${Math.round(Math.random() * 1e9)}-${Date.now()}.jpeg`;

    if(req.file){
        await sharp(req.file.buffer)
        .resize(600 , 600)
        .toFormat('jpeg')
        .jpeg({quality : 90})
        .toFile(`uploads/brands/${filename}`)
    
        req.body.image = filename
    }


    next()

})


// @desc    Get list of Brands
// @route   Get /api/v1/Brands
// @access  Public
exports.getBrands = factory.getAll(BrandModel)

// @desc    GET brand by ID
// @route   GET /api/v1/Brands/:id
// @access  Public
exports.getBrandByid = factory.getOneById(BrandModel)

// @desc    Post create Brands
// @route   Post /api/v1/Brands
// @access  Priavte
exports.createBrand = factory.createOne(BrandModel)

// @desc    update brand by ID
// @route   put /api/v1/Brands/:id
// @access  Priavte
exports.updateBrandByid = factory.updateOne(BrandModel)

// @desc    delete brand by ID
// @route   put /api/v1/Brands/:id
// @access  Priavte

exports.deleteBrandId = factory.deleteOne(BrandModel);
