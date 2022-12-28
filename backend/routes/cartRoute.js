const express = require("express");
router = express.Router();
const cartController = require("../controllers/cartController");
const { verifyUser, verifyAdmin } = require("../middlewares/authorization");

router
  .route("/:username")
  .get(verifyUser, cartController.getDetailCartByUsername);

router
  .route("/:username/book/:bookId")
  .post(verifyUser, cartController.addBookIntoCart);
// .delete(verifyUser, cartController.deleteBookFromCart);

router
  .route("/:username/book/:bookId")
  .delete(verifyUser, cartController.deleteBookFromCart);

router
  .route("/:username/book/:bookId/increase")
  .patch(verifyUser, cartController.increaseBookInCart);

router
  .route("/:username/book/:bookId/decrease")
  .patch(verifyUser, cartController.decreaseBookInCart);

module.exports = router;
