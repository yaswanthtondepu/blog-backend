var express = require("express");

var router = express.Router();
var dbobject = require("./connection");

router.post("/createpost", function (req, res, next) {
  const connection = dbobject();
  connection.connect();
  console.log(req.body.newPost);
  const { title, content, status, authorId, contentText } = req.body.newPost;
  const dateTime = new Date().toISOString().slice(0, 19).replace("T", " ");

  try {
    connection.query(
      `INSERT INTO Post (title,content,contenttext,author_id,created_at,updated_at,isPublished)` +
        `VALUES ("${title}", "${content}", "${contentText}", "${authorId}","${dateTime}","${dateTime}", "${status}");`,
      (err, rows, fields) => {
        if (err) throw err;
        else {
          res.json({
            msg: " Post created successfully",
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

router.get("/getallposts", function (req, res, next) {
  const connection = dbobject();
  connection.connect();
  try {
    connection.query(
      "select  p.id as postId,p.title,p.author_id,p.tags,p.updated_at, u.id as userId,u.username, (select count(*) from Reaction r where r.post_id = p.id) as reactionCount,  \
(select count(*) from Comment c where c.post_id = p.id) as commentCount \
 from Post p join User u on p.author_id = u.id where p.isPublished = 1;",

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

router.post("/getpostbyid", function (req, res, next) {
  try {
    const connection = dbobject();
    const { id } = req.body.post;
    connection.connect();

    connection.query(
      `select * from Post where id = ${id}`,
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
router.post("/getallpostsofUser", function (req, res, next) {
  try {
    const { userId } = req.body.User;
    console.log(req.body);
    const connection = dbobject();
    connection.connect();
    connection.query(
      `select * from Post where author_id = ${userId}`,
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
router.post("/deletepostbyid", function (req, res, next) {
  const connection = dbobject();
  const { id } = req.body.post;
  connection.connect();
  try {
    connection.query(
      `DELETE from Post where id = ${id}`,
      (err, rows, fields) => {
        if (err) throw err;
        else {
          console.log(rows);
          res.json({
            msg: "Post deleted successfully",
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
router.post("/updatepostbyid", function (req, res, next) {
  const connection = dbobject();
  connection.connect();
  console.log(req.body.updatePost);
  const { postId, title, content, status, authorId } = req.body.updatePost;
  const dateTime = new Date().toISOString().slice(0, 19).replace("T", " ");

  try {
    connection.query(
      `SELECT * from POST where id = "${postId}"`,
      (err, rows, fields) => {
        if (err) throw err;
        else {
          if (rows[0].authorId === authorId) {
          }
        }
      }
    );
    // move this to if block above :) and complete the rest. hehe :)
    // complete this ra yashu
    // byeee. See you Thursday
    connection.query(
      `UPDATE Post set title = "${title}" , content = "${content}", updated_at = "${dateTime}" where id = "${postId}"`,
      (err, rows, fields) => {
        if (err) throw err;
        else {
          res.json({
            msg: " Post updated successfully",
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

module.exports = router;
