// server create karna

const express = require('express');
const cors = require('cors');
const noteModel = require('./models/note.model');
const app = express();
app.use(cors());

// - post/api/notes
// - create new note and save data in mongoDB
// - req.body = {title,description}


//middleware
app.use(express.json());

// crate new note and save data in mongoDB using post request noteModel.create() method
app.post('/api/notes',async(req,res)=>{
    console.log(req.body);
    const {title,description} = req.body;

   const note = await noteModel.create({
        title,
        description
    })
    res.status(201).json({
        message : 'notes created successfully',
        note
    })

})

// - GET/api/notes
// - Fetch all notes from mongoDB and send them in the response

app.get('/api/notes',async(req,res)=>{
    const notes = await noteModel.find();
    res.status(200).json({
        message : 'notes fetched successfully',
        notes
    })
})

// - delete/api/notes/:id
// - delete a note from mongoDB based on the provided id in the request parameters

app.delete('/api/notes/:id',async(req,res)=>{
    const id = req.params.id;
    await noteModel.findByIdAndDelete(id);
    res.status(200).json({
        message : 'notes deleted successfully',
    })
})


// - patch/api/notes/:id
// - update a note in mongoDB based on the provided id in the request parameters and the updated data in the request body
// - req.body = {description}

app.patch('/api/notes/:id', async(req,res)=>{
    const id = req.params.id;
    const {description} = req.body;
      
    await noteModel.findByIdAndUpdate(id,{ description })
    res.status(200).json({
        message : 'notes updated successfully',
    })

})

module.exports = app;
