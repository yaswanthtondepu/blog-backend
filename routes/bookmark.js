var express = require("express");

var router = express.Router();
var dbobject = require("./connection");

router.post("/getuserbookmarks", function (req, res, next) {
    try {
        const connection = dbobject();
        const { userId } = req.body.bookmark;
        connection.connect();

        connection.query(
            `select b.postId, p.*, u.firstname, u.lastname from Bookmark b join Post p on b.postId = p.id join User u on u.id = p.author_id and b.userId = ${userId}`,
            (err, rows, fields) => {
                if (err) throw err;
                else {
                    console.log(rows);
                    res.json(rows);
                    connection.end();
                }
            }
        );

    }
    catch (error) {
        console.log(error)
        res.json({
            code: 1,
            err: "something error occured",
        });
        connection.end();
    }
});


router.post("/bookmarkpost", function (req, res, next) {
    const connection = dbobject();
    connection.connect();
    console.log(req.body.post);
    const { postId, userId } = req.body.post;

    try {
        connection.query(`SELECT * FROM Bookmark WHERE postId = ${postId} AND userId = ${userId}`, (err, rows, fields) => {
            if (err) throw err;
            else {
                if (rows.length > 0) {
                    connection.query(
                        `DELETE FROM Bookmark WHERE postId = ${postId} AND userId = ${userId}`,
                        (err, rows, fields) => {
                            if (err) throw err;
                            else {
                                res.json({
                                    msg: "Post unbookmarked successfully",
                                });
                                connection.end();
                            }
                        }
                    );
                }
                else {
                    connection.query(
                        `INSERT INTO Bookmark (postId, userId)` +
                        `VALUES (${postId}, ${userId});`,
                        (err, rows, fields) => {
                            if (err) throw err;
                            else {
                                res.json({
                                    msg: " Post bookmarked successfully",
                                });
                                connection.end();
                            }
                        }
                    );
                }
            }
        });

    } catch (error) {
        res.json({
            code: "1",
            error: "something went wrong",
        });
        connection.end();

        console.log(error);
    }
});

module.exports = router;
