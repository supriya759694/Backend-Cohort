const mongoose = require('mongoose');

//schema create karna means data ka structure define karna
const noteSchema = new mongoose.Schema({
    title:String,
    description : String,
})

const noteModel = mongoose.model("notes",noteSchema);
module.exports = noteModel;