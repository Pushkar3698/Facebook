const express = require("express");
const {
  home,
  createPost,
  getPosts,
  addLike,
  deletePost,
  addComment,
} = require("../controller/feed");
const { isAuth } = require("../middleware/is-auth");
const multer = require("multer");
const router = express.Router();
const path = require("path");

router.post("/home", isAuth, home);
router.post("/createPost", createPost);
router.get("/getPosts", isAuth, getPosts);
router.post("/addLike", isAuth, addLike);
router.post("/deletePost", isAuth, deletePost);
router.post("/addComment", isAuth, addComment);
module.exports = router;
