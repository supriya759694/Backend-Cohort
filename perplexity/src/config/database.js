import mongoose from "mongoose";

const connectDB = async ()=>{
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Mongo Connected : ${conn.connection.host}`);

};

export default connectDB;