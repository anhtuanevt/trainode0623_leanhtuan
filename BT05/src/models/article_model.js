const mongoose = require('mongoose')
const { Schema } = mongoose;

const articleModel = new Schema({
    title: String,
    slug: String,
    description: String,
    image: String,
    status: String,
    ordering: Number,
    is_show_home: Boolean,
    is_special: Boolean,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('articles', articleModel)