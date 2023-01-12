const mysql = require("mysql");

function connection() {
  return mysql.createConnection({
    host: "blog.ccsxo0vdgqdw.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "Aa12345678,.",
    database: "blog",
  });
}
module.exports = connection;
