const express = require('express');
const app = express();

//middleware to parse json data
app.use(express.json());

//create a array of notes
const notes = [];

app.post('/notes',(req,res)=>{
    console.log(req.body);
    //push the note to the array
    notes.push(req.body);
    res.send("note created successfully");
})

//get all notes using get method
app.get('/notes',(req,res)=>{
    res.send(notes);
})




app.listen(3000,()=>{
    console.log('server is running on port 3000');
});
