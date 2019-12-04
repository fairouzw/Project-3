var express = require("express");
var router = express.Router();

let Post = require("../models/post-model");
let User = require("../models/user-model");
let Comment = require("../models/comment-model");
const mongoose = require("mongoose");

//GET all posts
// /api/posts
// /api/posts?owner_id=12983761823515423
router.get("/", (req, res, next) => {
  dbQuery = req.query.owner_id ? { owner: req.query.owner_id } : {}
  Post.find(dbQuery)
    .populate('owner')
    .populate({
      path: 'comments',
      // model: 'Comment',
      populate: {
        path: 'owner',
        // model: 'User'
      }
    })
    .then(allThePosts => {
      res.json(allThePosts.map(post => ({
        ...(post.toJSON()),
        likes: post.likes ? post.likes.length : 0,
        hasLiked: post.likes ? post.likes.some(like => like.equals(req.user._id)) : false,
      })));
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

//get likes
router.get("/liked", (req, res, next) => {
  console.log(req.user._id)
  Post.find({ likes: req.user._id }).populate('comments')
    .then(allThePosts => {
      res.json(allThePosts.map(post => ({
        ...(post.toJSON()),
        likes: post.likes ? post.likes.length : 0,
        hasLiked: post.likes ? post.likes.some(like => like.equals(req.user._id)) : false,
      })));
    })
    .catch(err => {
      res.json(err);
    });
});

router.post("/:id/like", (req, res, next) => {
  Post.findByIdAndUpdate(req.params.id, {
    $addToSet: { likes: req.user._id }
  }, { new: true }).then(post => {
    console.log("I am here. 1 new doc/////", post);

    res.json({
      ...(post.toJSON()),
      likes: post.likes ? post.likes.length : 0,
      hasLiked: post.likes ? post.likes.some(like => like.equals(req.user._id)) : false,
    });
  });
});

router.delete("/:id/like", (req, res, next) => {
  Post.findByIdAndUpdate(req.params.id, {
    $pull: { likes: req.user._id }
  }, { new: true }).then(post => {
    console.log("I am here. 1 new doc/////", post);

    res.json({
      ...(post.toJSON()),
      likes: post.likes ? post.likes.length : 0,
      hasLiked: post.likes ? post.likes.some(like => like.equals(req.user._id)) : false,
    });
  });
});


// /api/posts/o1i72367458523dasdztr
router.get("/:id", function (req, res, next) {
  Post.findById(req.params.id).populate('comments').then(post => {

    res.json({
      ...(post.toJSON()),
      likes: post.likes ? post.likes.length : 0,
      hasLiked: post.likes ? post.likes.some(like => like.equals(req.user._id)) : false,
    });

    res.json(post);

  });
});

// post /api/posts/new-post
router.post("/new-post", (req, res, next) => {
  console.log("I am here.");
  Post.create({
    imgUrl: req.body.imgUrl,
    location: req.body.location,
    address: req.body.address,
    description: req.body.description,
    postname: req.body.postname,
    owner: req.user._id,
    tags: req.body.tags,
    comments: req.body.comments,
    // categories: req.body.categories,
    // likes: req.user._id,
    // expireDate: req.body.expireDate
  }).then(response => {
    console.log("I am here. 1 new doc", response);
    res.json({
      response: {
        ...(response.toJSON()),
        likes: response.likes ? response.likes.length : 0,
        hasLiked: response.likes ? response.likes.some(like => like.equals(req.user._id)) : false,
      }
    });
  });
  // .catch(err => {
  //     //console.log('I am here. 2', err)
  //     res.json(JSON.stringify(err.message));
  // })
});

//PUT
router.put("/:id", (req, res, next) => {
  const {
    imgUrl,
    description,
    postname,
    categories,
    likes,
    expireDate
  } = req.body;

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Post.findByIdAndUpdate(req.params.id, {
    imgUrl,
    description,
    postname,
    categories,
    likes,
    expireDate
  })
    .then(() => {
      res.json({
        message: `Post data with ${req.params.id} has been updated successfully.`
      });
    })
    .catch(err => {
      res.json(err);
    });
});

router.delete("/:id", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  Post.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({
        message: `Project with ${req.params.id} is removed successfully.`
      });
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
