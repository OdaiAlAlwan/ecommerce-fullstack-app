const {check, body} = require("express-validator")
const slugify = require("slugify")
const bcrypt = require('bcryptjs')
const User = require('../models/UserModel')
const validatorMiddleware = require("../middlewares/validatorMiddleware")

exports.getUserValidator = [
    check('id').isMongoId().withMessage('invalid user id'),
    validatorMiddleware,
]

exports.createUserValidator = [
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
    check('phone').optional().isMobilePhone(['ar-SA']),
    check('profileImage').optional(),
    check('role').optional(),
    validatorMiddleware,
]
exports.updateUserValidator = [
    check('id').isMongoId().withMessage('Invalid User id format'),
    body('name')
      .optional()
      .custom((val, { req }) => {
        req.body.slug = slugify(val);
        return true;
      }),
    check('email')
    .notEmpty()
    .withMessage('Email required')
    .isEmail()
    .withMessage('Invalid email address')
    .custom((val) =>
      User.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error('E-mail already in user'));
        }
      })
    ),
    check('phone')
      .optional()
      .isMobilePhone(['ar-SA'])
      .withMessage('Invalid phone number only accepted SA Phone number'),
  
    check('profileImg').optional(),
    check('role').optional(),
    validatorMiddleware,
]

exports.changeUserPasswordValidator = [
    check('id').isMongoId().withMessage('Invalid User id format'),
    body('currentPassword')
      .notEmpty()
      .withMessage('You must enter your current password'),
    body('passwordConfirm')
      .notEmpty()
      .withMessage('You must enter the password confirm'),
    body('password')
      .notEmpty()
      .withMessage('You must enter new password')
      .custom(async (val, { req }) => {
        // 1) Verify current password
        const user = await User.findById(req.params.id);
        if (!user) {
          throw new Error('There is no user for this id');
        }
        const isCorrectPassword = await bcrypt.compare(
          req.body.currentPassword,
          user.password
        );
        if (!isCorrectPassword) {
          throw new Error('Incorrect current password');
        }
  
        // 2) Verify password confirm
        if (val !== req.body.passwordConfirm) {
          throw new Error('Password Confirmation incorrect');
        }
        return true;
      }),
    validatorMiddleware,
  ];
  


exports.deleteUserValidator = [
    check('id').isMongoId().withMessage('invalid Brand id'),
    validatorMiddleware,
]

exports.updateLoggedUserDataValidator = [
  body('name')
  .optional()
  .custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  check('email')
  .optional()
  .isEmail()
  .withMessage('Invalid email address')
  .custom((val) =>
    User.findOne({ email: val }).then((user) => {
      if (user) {
        return Promise.reject(new Error('E-mail already in user'));
      }
    })
  ),
  check('phone').optional().isMobilePhone(['ar-SA'])
  .withMessage('Invalid phone number only accepted  SA Phone numbers'),
  check('profileImg').optional(),
  validatorMiddleware,
]