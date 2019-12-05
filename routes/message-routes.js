var express = require("express");
var router = express.Router();

let Message = require("../models/message-model");
let User = require("../models/user-model");

const mongoose = require("mongoose");

router.get("/", (req, res, next) => {
    Message.find({ recipient: req.user._id })
        .then(allRecipientMessages => {
            res.json(allRecipientMessages);
        })
        .catch(err => {
            res.json(err);
        });
})
router.get("/sent", (req, res, next) => {
    Message.find({ sender: req.user._id })
        .then(allSenderMessages => {
            res.json(allSenderMessages);
        })
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

router.post('/new-message', (req, res, next) => {
    Message.create({
        subject: req.body.subject,
        content: req.body.content,
        read: req.body.read,
        recipient: req.body.recipient,
        sender: req.user,

    }).then((message) => {

        res.json(message)

    })

});

module.exports = router;
