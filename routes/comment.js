var express = require("express");

var router = express.Router();
var dbobject = require("./connection");

router.post("/addNewComment", function (req, res, next) {
    const connection = dbobject();
    connection.connect();
    console.log(req.body.comment);
    const { content,postId,authorId } = req.body.comment;
    const dateTime = new Date().toISOString().slice(0, 19).replace("T", " ");

    try {
        connection.query(
            `INSERT INTO Comment (content,author_id,post_id,created_at,updated_at)` +
            `VALUES (${connection.escape(content)}, ${authorId}, "${postId}","${dateTime}","${dateTime}");`,
            (err, rows, fields) => {
                if (err) throw err;
                else {
                    res.json({
                        msg: " Comment added successfully",
                    });
                    connection.end();
                }
            }
        );
    } catch (error) {
        res.json({
            code: "1",
            error: "something went wrong",
        });
        connection.end();

        console.log(error);
    }
});

router.post("/getcommentbypostid", function (req, res, next) {
    try {
        const connection = dbobject();
        const { id } = req.body.post;
        connection.connect();

        connection.query(
            `select c.*, u.firstname, u.lastname, u.id as authorId from Comment c join User u on c.author_id = u.id where c.post_id = ${id}`,
            (err, rows, fields) => {
                if (err) throw err;
                else {
                    console.log(rows);
                    res.json(rows);
                    connection.end();
                }
            }
        );
    } catch (error) {
        res.json({
            code: 1,
            err: "something error occured",
        });
        connection.end();
    }
});

router.post("/deletecommentbyid", function (req, res, next) {
    const connection = dbobject();
    const { id, authorId } = req.body.comment;
    connection.connect();
    try {
        connection.query(`select * from Comment where id = ${id} and author_id = ${authorId}`, (err, rows, fields) => {
            if (err) throw err;
            else if (rows.length == 0) {
                res.json({
                    code: 1,
                    err: "Comment not found",
                });
                connection.end();
            }
            else {
                connection.query(
                    `DELETE from Comment where id = ${id}`,
                    (err, rows, fields) => {
                        if (err) throw err;
                        else {
                            console.log(rows);
                            res.json({
                                msg: "Comment deleted successfully",
                            });
                            connection.end();
                        }
                    }
                );
            }
        })


    } catch (error) {
        res.json({
            code: 1,
            err: "something went wrong",
        });
        connection.end();
    }
});


router.post("/editComment", function (req, res, next) {
    try {
        const connection = dbobject();
        const { id,content } = req.body.editComment;
        connection.connect();
        const dateTime = new Date().toISOString().slice(0, 19).replace("T", " ");

        connection.query(
            `UPDATE Comment SET content = ${connection.escape(content)}, updated_at = "${dateTime}"  where id = ${id}`,
            (err, rows, fields) => {
                if (err) throw err;
                else {
                    res.json({
                        msg: " Comment edited successfully",
                    });
                    connection.end();
                }
            }
        );
    } catch (error) {
        res.json({
            code: 1,
            err: "something error occured",
        });
        connection.end();
    }
});

module.exports = router;