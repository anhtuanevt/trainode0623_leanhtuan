const mongoose = require('mongoose')
const { Schema } = mongoose;

const itemSchema = new Schema({
    name: String,
    age: Number
});

module.exports = mongoose.model('Items', itemSchema)