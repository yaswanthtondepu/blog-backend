var express = require("express");
var router = express.Router();
var dbobject = require("../connection");
/* GET home page. */
router.post("/signup", function (req, res, next) {
  console.log(req.body.newUser);
  const { userName, password, firstName, lastName, email } = req.body.newUser;
  connection = dbobject();
  connection.connect();
  try {
    connection.query(
      `SELECT username FROM User WHERE username="${userName}"`,
      (err, rows, fields) => {
        console.log(rows);
        if (err) throw err;
        else if (rows.length !== 0) {
          res.json({ error: { code: 1, errormsg: "username cannot be same" } });
          console.log("username cannot be same");
          connection.end();
        } else {
          connection.query(
            `SELECT email FROM User WHERE email="${email}"`,
            (err, rows, fields) => {
              if (err) throw err;
              else if (rows.length !== 0) {
                res.json({
                  error: { code: 2, errormsg: "email cannot be same" },
                });
                console.log("email cannot be same");
                connection.end();
              } else {
                connection.query(
                  `INSERT INTO User (username,firstname,lastname,password,email)` +
                    `VALUES ("${userName}", "${firstName}", "${lastName}","${password}", "${email}");`,
                  (err, rows, fields) => {
                    if (err) throw err;
                    else {
                      console.log(rows, fields);
                      res.json({ msg: "user created successfully" });
                      connection.end();
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.json({
      error: { code: 3, errormsg: "internal error occured" },
    });
    connection.end();
  }
});

router.get("/signIn", function (req, res, next) {
  res.json({ tondepu: "yash" });
});

module.exports = router;
