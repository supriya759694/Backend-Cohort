const express = require('express');
const app = express();
const testRouter = require('./routes/test.routes')


//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use('/api',testRouter)


app.get('/',(req,res)=>{
    res.send('hello form app.js');
})


module.exports = app;