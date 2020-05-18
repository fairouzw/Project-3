var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user-model");


//GET all profiles
router.get("/profiles", (req, res, next) => {
  User.find()
    .then(allTheProfiles => {
      res.json(allTheProfiles);
    })
    .catch(err => {
      res.json(err);
    });
});

// GET route
router.get("/profiles/:id", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  User.findById(req.params.id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.json(err);
    });
});

//PUT
router.put("/profiles/:id", (req, res, next) => {
  const { username, email, city, country, favourites, posts, follows } = req.body;

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
    follows
  })
    .then(() => {
      res.json({
        message: `Profile data for User with ${req.params.id} has been updated successfully.`
      });
    })
    .catch(err => {
      res.json(err);
    });
});

router.delete('/profiles/:id/delete', (req, res, next) => {
  User.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({
        message: `Project with ${req.params.id} is removed successfully.`
      });
    })
    .catch(err => {
      res.json(err);
    });
});


exports.collectEmail = (req, res) => {
  const { email } = req.body
  
  User.findOne({ email })
    .then(user => {
      
      // We have a new user! Send them a confirmation email.
      if (!user) {
        User.create({ email })
          .then(newUser => sendEmail(newUser.email, templates.confirm(newUser._id)))
          .then(() => res.json({ msg: msgs.confirm }))
          .catch(err => console.log(err))
      }

      // We have already seen this email address. But the user has not
      // clicked on the confirmation link. Send another confirmation email.
      else if (user && !user.confirmed) {
        sendEmail(user.email, templates.confirm(user._id))
          .then(() => res.json({ msg: msgs.resend }))
      }

      // The user has already confirmed this email address
      else {
        res.json({ msg: msgs.alreadyConfirmed })
      }

    })
    .catch(err => console.log(err))
}


module.exports = router;
