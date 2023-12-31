const mongoose = require('mongoose')
const { Schema } = mongoose;

const categoryModel = new Schema({
    name: String,
    status: String,
    ordering: Number,
    isShowHome: Boolean,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('categories', categoryModel)