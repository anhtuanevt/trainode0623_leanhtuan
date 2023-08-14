const mongoose = require("mongoose");
const {dbUsername, dbPassword} = require ('./account.js')
const dbUrl  = `mongodb+srv://${dbUsername}:${dbPassword}@cluster0.hylauax.mongodb.net/items_data`

async function connect() {
  try {
    mongoose.set('strictQuery' , true)
   await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connect successfully");
  } catch (error) {
    console.log("Connect fail");
  }
}

module.exports = { connect };
