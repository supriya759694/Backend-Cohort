import "dotenv/config";
import app from "./src/app.js";
import connectDB from "./src/config/database.js";


const PORT = process.env.PORT || 3000;

connectDB()
   .catch((err)=>{
    console.log("Mongo connection failed :",err);
    process.exit(1);
   })

console.log("JWT_SECRET:", process.env.JWT_SECRET);
app.listen(3000,(req,res)=>{
    console.log(`Server running on Port ${PORT}`);
})
    