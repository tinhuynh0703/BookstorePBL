const express = require("express");
const router = express.Router();
const billController = require("../controllers/billController");
const protect = require("../middlewares/authorization");

router
  .route("/:username")
  .get(protect.verifyUser, billController.getBillByUsername)
  .post(protect.verifyUser, billController.createBill);

router
  .route("/detail/:billId")
  .get(protect.verifyUser, billController.getBillByBillId);

router
  .route("/:billId/books")
  .get(protect.verifyUser, billController.getBookByBillId);

module.exports = router;
