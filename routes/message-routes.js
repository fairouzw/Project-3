var express = require("express");
var router = express.Router();
let Message = require("../models/message-model");
let User = require("../models/user-model");
const mongoose = require("mongoose");

//middleware
const isAuthenticated = (req, res, next) => {
    if (req.user) {
        next()
    } else {
        res.redirect('/login')
    }
}

router.get("/sent",isAuthenticated, (req, res, next) => {
    Message.find({ sender: req.user._id }).populate('sender').populate('recipient')

        .then(allSenderMessages => {
            allSenderMessages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            res.json(allSenderMessages);
        })

        .catch(err => {
            res.json(err);
        });
})

router.get("/unread",isAuthenticated, (req, res, next) => {
    Message.count({ read: null, recipient: req.user._id }).then(count => {
        res.json({ count });
    });
});

router.get("/rec",isAuthenticated, (req, res, next) => {
    Message.find({ recipient: req.user._id }).populate('recipient').populate('sender')
        .then(allRecipientMessages => {
            allRecipientMessages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            allRecipientMessages.filter(message => message.read == null).forEach(message => {
                console.log(message._id);
                Message.findByIdAndUpdate(message._id, { read: new Date() }).exec();
            })
            res.json(allRecipientMessages);
        })
        .catch(err => {
            res.json(err);
        });
})

router.get("/:id",isAuthenticated, (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
    }
    Message.findById(req.params.id).populate('sender').populate('recipient')
        .then(response => {
            res.status(200).json(response);
        })
        .catch(err => {
            res.json(err);
        });
});

router.get("/new-message/:id",isAuthenticated, (req, res, next) => {
    User.findById(req.params.id)
        .then(response => {
            res.status(200).json(response);
        })
        .catch(err => {
            res.json(err);
        });
})

// router.post("/new-message/:id", (req, res, next) => {
//     if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
//       res.status(400).json({ message: "Specified id is not valid" });
//       return;
//     }
//     User.findById(req.params.id)
//       .then(Message.create({
//         subject: req.body.subject,
//         content: req.body.content,
//         read: req.body.read,
//         recipient: req.body.recipient,
//         sender: req.user,

//     }).then((message) => {

//         res.json(message)

//     })
//     )});

router.post('/new-message/:id',isAuthenticated, (req, res, next) => {
    Message.create({
        subject: req.body.subject,
        content: req.body.content,
        read: req.body.read,
        recipient: req.body.recipient,
        sender: req.user,
        read: null,

    }).then((message) => {
        res.json(message)
    })
});

module.exports = router;
