const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    subject: String,
    content: String,
    sender: { type: Schema.Types.ObjectId, ref: 'User' },
    read: Date,
    recipient: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
    timestamps: true
});

module.exports = mongoose.model("Message", messageSchema);