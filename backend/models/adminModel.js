const db = require("./database");

exports.createAdmin = async (username, password, email) => {
  let userData = {
    username,
    password,
    email,
  };
  return new Promise((resolve, reject) => {
    let sql = "INSERT INTO user SET ?, admin = 1";
    db.query(sql, userData, (err, data) => {
      if (err) console.log(err);
      else resolve(data);
    });
  });
};

exports.getAllAdmin = async () => {
  return new Promise((resolve, reject) => {
    let sql = "SELECT * FROM user WHERE admin = 1";
    db.query(sql, (err, data) => {
      if (err) console.log(err);
      else resolve(data);
    });
  });
};

exports.resetPasswordByUsername = async (username, hashedPassword) => {
  return new Promise((resolve, reject) => {
    let sql = `UPDATE user SET password = '${hashedPassword}' WHERE username = '${username}'`;
    db.query(sql, (err, data) => {
      if (err) console.log(err);
      else resolve(data);
    });
  });
};
