const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const protect = require("../middlewares/authorization");

router.route("/").get(commentController.getAllComment);

router.route("/book/:bookId").get(commentController.getCommentByBookId);

router
  .route("/user/:username/book/:bookId")
  .post(protect.verifyUser, commentController.postCommentbyUsername);

module.exports = router;
