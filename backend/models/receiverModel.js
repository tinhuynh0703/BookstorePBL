const db = require("./database");

exports.getReceiverByBillId = async (billId) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT receiverName, receiverPhone, receiverAddress FROM receiver INNER JOIN bill ON receiver.cartId = bill.cartId WHERE bill.billId = ${billId}`;
    db.query(sql, (err, data) => {
      if (err) console.log(err);
      else resolve(data);
    });
  });
};

exports.getReceiverByCartId = async (cartId) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM receiver WHERE cartId = ${cartId}`;
    db.query(sql, (err, data) => {
      if (err) console.log(err);
      else resolve(data);
    });
  });
};

exports.createReceiverbyCartId = async (cartId, body) => {
  const { receiverName, receiverPhone, receiverAddress } = body;
  const receiverData = { cartId, receiverName, receiverPhone, receiverAddress };
  return new Promise((resolve, reject) => {
    let sql = `INSERT INTO receiver SET ?`;
    db.query(sql, receiverData, (err, data) => {
      if (err) console.log(err);
      else resolve(data);
    });
  });
};
