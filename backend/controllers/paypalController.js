const paypal = require("paypal-rest-sdk");
const Bill = require("../models/billModel");

var globalPrice = 0;

paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id:
    "AZVBTtsVtmd4IW_BppWM7O8hcC_19xODbxAkjEJY6w5yLd-Im3a5FMicVrbAG9mXZoi0nIJs3A9Rl3jy",
  client_secret:
    "EG5XY4VqAgJS3YB2BfAQa1PaWosFl5xmFIcAKM6UeeIuF8asxxLqqscqluPgk3AdIYPLLzg5vNbSFbur",
});

const createPayment = async (req, res) => {
  let totalPrice = req.query.totalPrice;
  globalPrice = totalPrice;
  const item = [
    {
      name: "item",
      sku: "item",
      price: globalPrice,
      currency: "USD",
      quantity: 1,
    },
  ];
  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: "http://localhost:3000/api/paypal/return/success",
      cancel_url: "http://localhost:3000/api/paypal/return/cancel",
    },
    transactions: [
      {
        item_list: {
          items: item,
        },
        amount: {
          currency: "USD",
          total: globalPrice,
        },
        description: "This is the payment description.",
      },
    ],
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      res.status(400).json({
        message: "Payment failed!",
      });
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === "approval_url") {
          res.status(200).json({
            redirectUrl: payment.links[i].href,
          });
        }
      }
    }
  });
};

const successPayment = (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    payer_id: payerId,
    transactions: [
      {
        amount: {
          currency: "USD",
          total: globalPrice,
        },
      },
    ],
  };

  paypal.payment.execute(paymentId, execute_payment_json, (error) => {
    if (error) {
      console.log(error.response);
      throw error;
    } else {
      res.redirect("http://localhost:3001/checkout/success");
    }
  });
};

const cancelPayment = async (req, res) => {
  const bills = await Bill.getAllBills();
  await Bill.deleteBillById(bills[0].billId);
  res.redirect("http://localhost:3001/checkout");
};

module.exports = {
  createPayment,
  successPayment,
  cancelPayment,
};
