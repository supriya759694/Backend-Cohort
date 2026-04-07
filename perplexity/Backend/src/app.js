import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";   // import routes


const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

app.get("/", (req,res)=>{
    res.json({message : "Welcome to Perplexity"});
});


// connect auth routes
app.use("/api/auth", authRoutes);

export default app;
