var express = require("express");
var router = express.Router();

let Message = require("../models/message-model");
let User = require("../models/user-model");

const mongoose = require("mongoose");


router.get("/sent", (req, res, next) => {
    Message.find({ sender: req.user._id }).populate('sender').populate('recipient')
        .then(allSenderMessages => {
            res.json(allSenderMessages);
        })
        .catch(err => {
            res.json(err);
        });
})

router.get("/unread", (req, res, next) => {
    Message.count({ read: null, recipient: req.user._id }).then(count => {
        res.json({ count });
    });
});

router.get("/rec", (req, res, next) => {
    Message.find({ recipient: req.user._id }).populate('recipient').populate('sender')
        .then(allRecipientMessages => {
            allRecipientMessages.filter(message => message.read == null).forEach(message => {
                console.log(message._id);
                Message.findByIdAndUpdate(message._id, { read: new Date() }).exec();
            })
            res.json(allRecipientMessages);
        }
        )
        .catch(err => {
            res.json(err);
        });
})

router.get("/:id", (req, res, next) => {
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

router.get("/new-message/:id", (req, res, next) => {
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

router.post('/new-message/:id', (req, res, next) => {
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
