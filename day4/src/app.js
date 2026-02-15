/**
 -- server created with express
 -- server connected to mongodb with mongoose

  
 */
 const express = require('express');
 const app = express();// server createed

 //middleware
 app.use(express.json());

 const notes=[];

app.get('/',(req,res)=>{
    res.send('Hello world');
})

/*
post/notes
*/
//using this post method we can create a note and store it in the notes array 
app.post('/notes',(req,res)=>{
    console.log(req.body);
    notes.push(req.body);
    console.log(notes);
    res.send('notes created');
})


/** 
get/notes

using this get method we can get all the notes stored in the notes array and send it as a response to the client
 */
app.get('/notes',(req,res)=>{
    res.send(notes);
})

/**
 delete/notes/<id>
 params
 */
app.delete('/notes/:index',(req,res)=>{
    const index = req.params.index;
   delete notes[index];
  console.log(notes);
  res.send('note deleted successfully');
})


/*
PATCH/notes/index
req.body = {description : 'new modified description'}

*/
app.patch('/notes/:index',(req,res)=>{
    notes[req.params.index].description = req.body.description;
    res.send('note updated successfully'); 
})


module.exports=app;



