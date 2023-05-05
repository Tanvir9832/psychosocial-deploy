const express = require("express");
const {
  signIn,
  login,
  followUser,
  getFollowingsPost,
  forgetPasswordController,
  updatePassword,
  updateProfile,
  profileDelete,
  myProfile,
  getUsersProfile,
  getAllusers,
  userProfilePicture,
  forgetPassword,
  searchingUser,
  verifyEmail,
} = require("../controllers/user");
const isAuthenticated = require("../middlewares/auth");
const router = express.Router();

router.post("/signin", signIn);
router.post("/login", login);
router.get("/follow/:id", isAuthenticated, followUser);
router.get("/posts", isAuthenticated, getFollowingsPost);

router.put("/update/password", isAuthenticated, updatePassword);
router.put("/update/profile", isAuthenticated, updateProfile);
router.post("/profile/delete", isAuthenticated, profileDelete);

router.get("/myProfile", isAuthenticated, myProfile);
router.get("/getAllUsers", isAuthenticated, getAllusers);
router.get("/getUsersProfile/:id", isAuthenticated, getUsersProfile);
router.post("/changeProfilePicture", isAuthenticated, userProfilePicture);
router.post("/forget-password", forgetPassword);
router.post("/forget-password/:id/:token", forgetPasswordController);
router.get("/searching", isAuthenticated, searchingUser);
router.get("/user/verification/:id/:token", verifyEmail);

module.exports = router;
