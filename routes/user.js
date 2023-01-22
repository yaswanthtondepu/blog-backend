var express = require("express");
var router = express.Router();
var dbobject = require("./connection");

router.post("/getuserbyusername", function (req, res, next) {
    const connection = dbobject();
    connection.connect();
    console.log(req.body.user);
    const { userName } = req.body.user;
    try {

        connection.query(
            `select firstname, lastname, id, username, joined from User where username = '${userName}'`,

            (err, rows, fields) => {
                if (err) throw err;
                console.log(rows);
                res.json(rows);
                connection.end();
            }
        );
    } catch {
        console.log(err);
        res.json({
            code: "1",
            err: "error occured",
        });
        connection.end();
    }
});

module.exports = router;

