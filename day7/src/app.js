// server start karna
const express = require('express');
const app = express();
const noteModel = require('./models/notes.model');



//middleware
app.use(express.json());

//post/notes
//req.body =>{ title,description}

app.post('/notes',async(req,res)=>{
    const {title,description,age} = req.body;
    console.log(title,description,age);
    const note = await noteModel.create({
        title,
        description,
        age,
    })
    res.status(201).json({
        message : "note created successfully",
        note,
    })

})



//get/notes
//fetch all notes from database and send to client
app.get('/notes',async(req,res)=>{
    const notes = await noteModel.find();

    res.status(200).json({
        message : "notes fetched successfully",
        notes,
    })


})
module.exports = app;