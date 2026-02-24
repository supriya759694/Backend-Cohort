const mongoose = require('mongoose');

//database connection 
function connectToDB(){
    mongoose.connect(process.env.Mongo_uri)
    .then(()=>{
        console.log("Connected to database")
    })
}

module.exports = connectToDB;