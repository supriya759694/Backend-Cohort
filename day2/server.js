const express = require('express');
const app = express();


app.get('/',(req,res)=>{
    res.send('hello world');
})

app.listen(3000,(req,res)=>{
    console.log('server running on port 3000');
})
