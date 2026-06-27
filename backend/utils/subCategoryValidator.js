const {check, body} = require("express-validator")
const slugify = require("slugify")
const validatorMiddleware = require("../middlewares/validatorMiddleware")


exports.getSubCategroyValidator = [
    check('id').isMongoId().withMessage('invalid SubCategroy id'),
    validatorMiddleware,
]

exports.createSubCategroyValidator = [
    check('name')
    .notEmpty()
    .withMessage('SubCategory required')
    .isLength({min : 2})
    .withMessage('Too short subCategory name')
    .isLength({max : 32})
    .withMessage('Too long subCategory name')
    .custom((val, {req}) => {
        req.body.slug = slugify(val)
        return true
    }) ,
    check('category').notEmpty()
    .withMessage('SubCategory must be belong to category')
    .isMongoId().withMessage('invalid categroy id'),
    validatorMiddleware,
]

exports.updateSubCategroyValidator = [
    check('id').isMongoId().withMessage('invalid categroy id'),
    body('name').custom((val, {req}) => {
        req.body.slug = slugify(val)
        return true
    }) ,
    validatorMiddleware,
]
exports.deleteSubCategroyValidator = [
    check('id').isMongoId().withMessage('invalid categroy id'),
    validatorMiddleware,
]
