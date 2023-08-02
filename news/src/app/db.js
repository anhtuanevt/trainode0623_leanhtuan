const mongoose = require('mongoose');

const connectDB = () => {
    mongoose.connect('mongodb+srv://admin:sPyzgS68icKFSU5Q@cluster0.hylauax.mongodb.net/items_data?retryWrites=true&w=majority')
    .then(() => console.log('Connected!')).catch(e => {
        console.log("connect error");
    });
}

module.exports = connectDB