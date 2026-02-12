const express = require('express');
const app = express();


app.get('/',(req,res)=>{
    res.send('hello world');
})

app.get('/about',(req,res)=>{
    res.send('about page');
})
app.listen(3000,(req,res)=>{
    console.log('server running on http://localhost:3000');
})


