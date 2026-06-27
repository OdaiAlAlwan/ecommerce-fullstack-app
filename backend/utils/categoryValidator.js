
const {check, body} = require("express-validator")
const slugify = require("slugify")
const validatorMiddleware = require("../middlewares/validatorMiddleware")

exports.getCategroyValidator = [
    check('id').isMongoId().withMessage('invalid categroy id'),
    validatorMiddleware,
]

exports.createCategroyValidator = [
    check('name')
    .notEmpty()
    .withMessage('Category required')
    .isLength({min : 3})
    .withMessage('Too short category name')
    .isLength({max : 32})
    .withMessage('Too long category name')
   .custom((val, {req}) => {
        req.body.slug = slugify(val)
        return true
    }) ,
    validatorMiddleware,
]
exports.updateCategroyValidator = [
    check('id').isMongoId().withMessage('invalid categroy id'),
    body('name').optional()
    .custom((val, {req}) => {
        req.body.slug = slugify(val)
        return true
    }) ,
    validatorMiddleware,
]
exports.deleteCategroyValidator = [
    check('id').isMongoId().withMessage('invalid categroy id'),
    validatorMiddleware,
]



