const mongoose = require('mongoose')
const { Schema } = mongoose;

const categoryModel = new Schema({
    name: String,
    status: String,
    ordering: Number
});

module.exports = mongoose.model('categories', categoryModel)