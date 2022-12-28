const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const protect = require("../middlewares/authorization");

router
  .route("/")
  .get(bookController.getAllBook)
  .post(protect.verifyAdmin, bookController.createBook);

router.route("/category/:catId").get(bookController.getBookByCategoryId);

router.route("/search").get(bookController.searchBook);

router
  .route("/:bookId")
  .get(bookController.getDetailBookById)
  .patch(protect.verifyAdmin, bookController.updateBookById)
  .delete(protect.verifyAdmin, bookController.deleteBookById);

module.exports = router;
