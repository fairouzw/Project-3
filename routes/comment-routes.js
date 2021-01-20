var express = require("express");
var router = express.Router();

let Post = require("../models/post-model");
let User = require("../models/user-model");
let Comment = require("../models/comment-model");
const mongoose = require("mongoose");

//middleware
const isAuthenticated = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect("/login");
  }
};

router.get("/", isAuthenticated, function (req, res, next) {
  Comment.find()
    .populate("post")
    .populate("owner")
    .then((response) => {
      res.json(response);
    });
});

router.get("/:post_id", isAuthenticated, function (req, res, next) {
  Comment.find()
    .populate("post")
    .populate("owner")
    .then((response) => {
      res.json(response);
    });
});

// POST /api/new-comment
router.post("/new-comment", isAuthenticated, (req, res, next) => {
  Comment.create({
    post: req.body.postId,
    owner: req.user, //add later ._id
    comment: req.body.comment,
  }).then((comment) => {
    return Post.findByIdAndUpdate(
      req.body.postId,
      { $push: { comments: comment } },
      { new: true }
    ).then(() => {
      res.json(comment);
    });
  });
});

module.exports = router;
