const express = require("express");
const isAuthenticated = require("../middlewares/auth");
const router = express.Router();

const {
  createPost,
  likeAndUnlike,
  deletePost,
  updateCaption,
  comment,
  commentDelete,
  commentUpdate,
  getMyPost,
  getUserPost,
} = require("../controllers/post");

router.post("/post/upload", isAuthenticated, createPost);
router.get("/post/:id", isAuthenticated, likeAndUnlike);
router.put("/post/:id", isAuthenticated, updateCaption);
router.delete("/post/:id", isAuthenticated, deletePost);
router.post("/comment/:id", isAuthenticated, comment);
router.put("/comment/:postid/:commentid", isAuthenticated, commentUpdate);
router.delete("/comment/:postid/:commentid", isAuthenticated, commentDelete);
router.get("/user/Post", isAuthenticated, getMyPost);
router.get("/user/Post/:id", isAuthenticated, getUserPost);

module.exports = router;
