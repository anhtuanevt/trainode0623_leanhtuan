const mongoose = require("mongoose");

async function connect() {
  try {
    mongoose.set('strictQuery' , true)
   await mongoose.connect('mongodb+srv://admin:sPyzgS68icKFSU5Q@cluster0.hylauax.mongodb.net/items_data', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connect successfully");
  } catch (error) {
    console.log("Connect fail");
  }
}

module.exports = { connect };
