var express = require("express");
var router = express.Router();
let Post = require("../models/post-model");
const mongoose = require("mongoose");
const User = require("../models/user-model");

//middleware
const isAuthenticated = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect("/login");
  }
};

//GET all posts
// /api/posts
router.get("/", isAuthenticated, (req, res, next) => {
  dbQuery = req.query.owner_id ? { owner: req.query.owner_id } : {};
  Post.find(dbQuery)
    .populate("owner")
    .populate({
      path: "comments",
      populate: {
        path: "owner",
      },
    })
    .then((allThePosts) => {
      allThePosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      res.json(
        allThePosts.map((post) => ({
          ...post.toJSON(),
          likes: post.likes ? post.likes.length : 0,
          hasLiked: post.likes
            ? post.likes.some((like) => like.equals(req.user._id))
            : false,
        }))
      );
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

//get likes
router.get("/liked", isAuthenticated, (req, res, next) => {
  Post.find({ likes: req.user._id })
    .populate("comments")
    .then((allThePosts) => {
      res.json(
        allThePosts.map((post) => ({
          ...post.toJSON(),
          likes: post.likes ? post.likes.length : 0,
          hasLiked: post.likes
            ? post.likes.some((like) => like.equals(req.user._id))
            : false,
        }))
      );
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/:id/like", isAuthenticated, (req, res, next) => {
  Post.findByIdAndUpdate(
    req.params.id,
    {
      $addToSet: { likes: req.user._id },
    },
    { new: true }
  ).then((post) => {
    res.json({
      ...post.toJSON(),
      likes: post.likes ? post.likes.length : 0,
      hasLiked: post.likes
        ? post.likes.some((like) => like.equals(req.user._id))
        : false,
    });
  });
});

router.delete("/:id/like", isAuthenticated, (req, res, next) => {
  Post.findByIdAndUpdate(
    req.params.id,
    {
      $pull: { likes: req.user._id },
    },
    { new: true }
  ).then((post) => {
    res.json({
      ...post.toJSON(),
      likes: post.likes ? post.likes.length : 0,
      hasLiked: post.likes
        ? post.likes.some((like) => like.equals(req.user._id))
        : false,
    });
  });
});

// /api/posts/:id
router.get("/:id", isAuthenticated, function (req, res, next) {
  Post.findById(req.params.id)
    .populate("comments")
    .populate("owner")
    .then((post) => {
      res.json({
        ...post.toJSON(),
        likes: post.likes ? post.likes.length : 0,
        hasLiked: post.likes
          ? post.likes.some((like) => like.equals(req.user._id))
          : false,
      });

      res.json(post);
    });
});

// post /api/posts/new-post
router.post("/new-post", isAuthenticated, (req, res, next) => {
  Post.create({
    imgUrl: req.body.imgUrl,
    location: req.body.location,
    address: req.body.address,
    description: req.body.description,
    postname: req.body.postname,
    owner: req.user._id,
    tags: req.body.tags,
    comments: req.body.comments,
  }).then((response) => {
    res.json({
      response: {
        ...response.toJSON(),
        likes: response.likes ? response.likes.length : 0,
        hasLiked: response.likes
          ? response.likes.some((like) => like.equals(req.user._id))
          : false,
      },
    });
  });
});

//PUT
router.put("/:id", isAuthenticated, (req, res, next) => {
  const { imgUrl, description, postname } = req.body;

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Post.findByIdAndUpdate(req.params.id, {
    imgUrl,
    description,
    postname,
  })
    .then(() => {
      res.json({
        message: `Post data with ${req.params.id} has been updated successfully.`,
      });
    })
    .catch((err) => {
      res.json(err);
    });
});

router.delete("/:id", isAuthenticated, (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  Post.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({
        message: `Post with ${req.params.id} is removed successfully.`,
      });
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
