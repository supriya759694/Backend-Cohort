const mongoose = require('mongoose');

const connectToDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('database connected successfully');
    }
    catch(error){
        console.error('database conneted failed',error.message);
        process.exit(1);
    }
};

module.exports = connectToDB;