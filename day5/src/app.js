//server create karna
//server ko config karna

const express = require('express')
const app = express()

//middleware
app.use(express.json())

const notes=[];

/*
/post/notes

*/
app.post('/notes',(req,res)=>{
    console.log(req.body);
    notes.push(req.body);
    
    res.status(201).json({
        message:'note created successfully',
    })

})

/*
/GET/notes
*/

app.get('/notes',(req,res)=>{
    res.status(200).json({
        message:'notes retrieved successfully',
        notes: notes
    })
})


/*
DELETE/notes/:index
 */

app.delete('/notes/:id',(req,res)=>{
    delete notes[req.params.id];
    res.status(200).json({
        message:'note deleted successfully'
    })
})  


/**
 /patch/notes/:index
 */

 app.patch('/notes/:id',(req,res)=>{
    notes[req.params.id].description = req.body.description;
    res.status(200).json({
        message:'note updated successfully'
    })
 })
module.exports = app;
