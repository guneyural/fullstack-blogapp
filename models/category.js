const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    }
});

module.exports = new mongoose.model('Category', categorySchema);