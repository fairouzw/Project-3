var express = require("express");
var router = express.Router();
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

//GET all profiles
router.get("/profiles", isAuthenticated, (req, res, next) => {
  User.find()
    .then((allTheProfiles) => {
      res.json(allTheProfiles);
    })
    .catch((err) => {
      res.json(err);
    });
});

// GET route
router.get("/profiles/:id", isAuthenticated, (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  User.findById(req.params.id)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.json(err);
    });
});

//PUT
router.put("/profiles/:id", isAuthenticated, (req, res, next) => {
  const {
    username,
    email,
    city,
    country,
    favourites,
    posts,
    follows,
  } = req.body;

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  User.findByIdAndUpdate(req.params.id, {
    username,
    email,
    city,
    country,
    favourites,
    posts,
    follows,
  })
    .then(() => {
      res.json({
        message: `Profile data for user with ${req.params.id} has been updated successfully.`,
      });
    })
    .catch((err) => {
      res.json(err);
    });
});

router.delete("/profiles/:id/delete", isAuthenticated, (req, res, next) => {
  User.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({
        message: `Profile data for user with ${req.params.id} is removed successfully.`,
      });
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
