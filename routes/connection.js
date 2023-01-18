const mysql = require("mysql2");
require("dotenv").config();

function connection() {
  // return mysql.createConnection({
  //   host: process.env.DB_HOST,
  //   user: process.env.DB_USER,
  //   password: process.env.DB_PASSWORD,
  //   database: process.env.DB_NAME,
  // });
  return mysql.createConnection({
    host: "blog.ccsxo0vdgqdw.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "Aa12345678,.",
    database: "blog",
  });
}
module.exports = connection;
