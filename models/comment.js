const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    ownerId: {
        type: String,
        required: true
    },
    blogId: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Comment', CommentSchema);