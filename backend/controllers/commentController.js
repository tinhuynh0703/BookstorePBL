const Comment = require("../models/commentModel");
const User = require("../models/userModel");

const getAllComment = async (req, res) => {
  const commentList = await Comment.getAllComment();
  res.status(200).json({
    commentList: commentList,
  });
};

const getCommentByBookId = async (req, res) => {
  const bookId = req.params.bookId;
  const commentList = await Comment.getCommentByBookId(bookId);
  res.status(200).json({
    commentList: commentList,
  });
};

const postCommentbyUsername = async (req, res) => {
  const bookId = req.params.bookId;
  const username = req.params.username;
  const content = req.body.content;
  const rating = req.body.rating;
  const user = await User.getUserByUsername(username);
  const commentList = await Comment.postCommentbyUserId(
    user[0].userId,
    bookId,
    content,
    rating
  );
  res.status(200).json({
    status: "success",
    message: "Post comment success!",
  });
};

module.exports = {
  getAllComment,
  getCommentByBookId,
  postCommentbyUsername,
};
