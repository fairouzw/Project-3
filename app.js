require("dotenv").config();

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

var indexRouter = require("./routes/index");
// var usersRouter = require("./routes/profile-routes");
const authRoutes = require("./routes/auth-routes");
const profRoutes = require("./routes/profile-routes");
const postRoutes = require("./routes/post-routes");
const commRoutes = require("./routes/comment-routes");
const messRoutes = require("./routes/message-routes");

var app = express();

const emailController = require('./email/email.controller');
const session = require("express-session");
const passport = require("passport");

require("./configs/passport");

// mongoose

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
  })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const MongoStore = require("connect-mongo")(session);
app.use(
  session({
    secret: "doesn't matter in our case", // but it's required
    resave: false,
    saveUninitialized: false, // don't create cookie for non-logged-in user
    // MongoStore makes sure the user stays logged in also when the server restarts
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/client/build")));


// app.use("/users", usersRouter);

app.get('/wake-up', (req, res) => res.json('👌'))

// This is the endpoint that is hit from the onSubmit handler in Landing.js
// The callback is shelled off to a controller file to keep this file light.
app.post('/email', emailController.collectEmail)

// Same as above, but this is the endpoint pinged in the componentDidMount of 
// Confirm.js on the client.
app.get('/email/confirm/:id', emailController.confirmEmail)

// session section
app.use(
  session({
    secret: "some secret goes here",
    resave: true,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

//app.use
app.use("/api", indexRouter);
app.use("/api", authRoutes);
app.use("/api", profRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commRoutes);
app.use("/api/messages", messRoutes);
app.use("/api", require("./routes/file-upload-routes"));

// catch 404 and forward to error handler
app.use("/api", function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  console.error(err)

  // render the error page
  res.status(err.status || 500);
  res.json("error with message " + err.message + "(check your server console!)");
});

app.use((req, res, next) => {
  // If no routes match, send them the React HTML.
  res.sendFile(__dirname + "/client/build/index.html");
});

module.exports = app;
