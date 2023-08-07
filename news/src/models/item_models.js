const mongoose = require('mongoose')
const { Schema } = mongoose;

const itemSchema = new Schema({
    name: {
        type: String,
        minLength: 5,
        maxLength: 10
    },
    link: String,
    ordering: Number,
    status: String,
    content: String
});

module.exports = mongoose.model('Items', itemSchema)