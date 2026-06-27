const {check} = require("express-validator")
const slugify = require("slugify")

const User = require('../models/UserModel')
const validatorMiddleware = require("../middlewares/validatorMiddleware")



exports.signupValidator = [
    check('name')
    .notEmpty()
    .withMessage('user required')
    .isLength({min : 2})
    .withMessage('Too short user name')
    .custom((val, {req}) => {
        req.body.slug = slugify(val)
        return true
    }),
    check('email')
    .notEmpty()
    .withMessage('email required')
    .isEmail()
    .withMessage('invalid email address')
    .custom((val) => User.findOne({email : val}).then((user) => {
        if(user){
            return Promise.reject(new Error('E-mail already in user'));
        }
    })
    ),
    check('password')
    .notEmpty()
    .withMessage('Password required')
    .isLength({min : 6})
    .withMessage('Password must be at least 6 characters'),
    check('passwordCinform').notEmpty().withMessage('passwordCinform required')
    .custom((passwordCinform , { req }) => {
        if(passwordCinform !== req.body.password){
            throw new Error('Password Confiemation incorrect')
        }
        return true
    }),

    validatorMiddleware,
]



exports.loginValidator = [
    check('email')
    .notEmpty()
    .withMessage('email required')
    .isEmail()
    .withMessage('invalid email address'),
    check('password')
    .notEmpty()
    .withMessage('Password required')
    .isLength({min : 6})
    .withMessage('Password must be at least 6 characters'),

    validatorMiddleware,
]
