const express = require("express");

const {
  getUser,
  getUserByid,
  createUser,
  updateUserByid,
  deleteUserByid,
  uploadUserImage,
  resizeImage,
  changeUserPassword,
  getLoggedUserData,
  updateLoggedUserPassword,
  updateLoggedUserData,
  deleteLoggedUserData,
} = require("../controller/UserController");
const {
  createUserValidator,
  updateUserValidator,
  deleteUserValidator,
  getUserValidator,
  changeUserPasswordValidator,
  updateLoggedUserDataValidator,
} = require("../utils/UserValidator");

const authController = require("../controller/AuthController");

const router = express.Router();


router.use(authController.protect)

router.get('/myProfile' , getLoggedUserData , getUserByid )
router.put('/updateUserPassword' , updateLoggedUserPassword)
router.put('/updateProfileData' , updateLoggedUserDataValidator , updateLoggedUserData)
router.put('/deleteProfile' ,  deleteLoggedUserData)


router
  .route("/")
  .get(
    authController.protect,
    authController.allowedTo("manager", "admin"),
    getUser
  )
  .post(
    authController.protect,
    authController.allowedTo("admin"),
    uploadUserImage,
    resizeImage,
    createUserValidator,
    createUser
  );

router.put(
  "/changePassword/:id",
  changeUserPasswordValidator,
  changeUserPassword
);

router
  .route("/:id")
  .get(
    authController.protect,
    authController.allowedTo("admin"),
    getUserValidator,
    getUserByid
  )
  .put(
    authController.protect,
    authController.allowedTo("admin"),
    uploadUserImage,
    resizeImage,
    updateUserValidator,
    updateUserByid
  )
  .delete(
    authController.protect,
    authController.allowedTo("admin"),
    deleteUserValidator,
    deleteUserByid
  );

module.exports = router;
