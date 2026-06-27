const express = require("express");

const {
  signup,
  login,
  forgotPassword,
  verifyPasswordResetCode,
  resetPassword,
  LogOut ,
  refreshToken,


} = require("../controller/AuthController");
const { signupValidator, loginValidator } = require("../utils/AuthValidator");

const router = express.Router();
router.get('/logOut' , LogOut )
router.get('/refreshToken' , refreshToken)
router.post("/signup", signupValidator, signup);
router.post("/login", loginValidator, login);
router.post("/forgotPassword", forgotPassword);
router.post("/verifyResetCode", verifyPasswordResetCode);
router.put("/resetPassword", resetPassword);

// router.route('/:id')
// .get(getUserValidator,getUserByid)
// .put(uploadUserImage , resizeImage , updateUserValidator ,updateUserByid)
// .delete(deleteUserValidator ,deleteUserByid)

module.exports = router;
