const db = require("./database");

exports.getAllCategory = async () => {
  return new Promise((resolve, reject) => {
    let sql = "SELECT * FROM category";
    db.query(sql, (err, data) => {
      if (err) console.log(err);
      else resolve(data);
    });
  });
};
