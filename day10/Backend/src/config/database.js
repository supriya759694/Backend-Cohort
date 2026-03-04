const mongoose = require('mongoose');


function connectToDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('database connected')
    })
    .catch((err)=>{
        console.log('not connected', err)
    })
}

module.exports = connectToDB;
