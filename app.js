const serverless = require("serverless-http");
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var indexRouter = require("./routes/index");
var authRouter = require("./routes/auth");
var postRouter = require("./routes/post");
var commentRouter = require("./routes/comment");
var userRouter = require("./routes/user");
var bookMarkRouter = require("./routes/bookmark");



var session = require("express-session");
var passport = require("passport");
var MySQLStore = require('connect-mysql')(session);
var mysqloptions = {
      config: {
       host: "blog.ccsxo0vdgqdw.us-east-1.rds.amazonaws.com",
      user: "admin",
      password: "Aa12345678,.",
      database: "blog"
      }
    }

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade"); 
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(mysqloptions)
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(passport.authenticate("session"));
app.use(cors());
app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/post", postRouter);
app.use("/comment", commentRouter);
app.use("/user", userRouter);
app.use("/bookmark", bookMarkRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  console.log(req.url)
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;

  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

module.exports.handler = serverless(app);
