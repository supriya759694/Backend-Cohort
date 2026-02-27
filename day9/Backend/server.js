//server start karna 
//server database se connect karna
const dotenv= require('dotenv').config();
const app = require('./src/app');
const connectToDB = require('./src/config/database');

connectToDB();


app.listen(3000, () => {
    console.log('server is running on port 3000');
});
