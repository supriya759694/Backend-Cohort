// server start karna 
//database se connect karna
//


const app = require('./src/app');
const mongoose = require('mongoose');



function connectToDb(){
    mongoose.connect('mongodb+srv://supriya:UKcHyOb690espiok@cluster0.iixpu1d.mongodb.net/day6')
    .then(() => {
        console.log('Connected to MongoDB Database');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });
}

connectToDb();
app.listen(3000, ()=>{
    console.log('server is running on port 3000');
})