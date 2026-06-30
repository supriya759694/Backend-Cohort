import express from 'express';
import runGraph from "./ai/graph.ai.js"
import cors from 'cors';

const app = express();
app.use(express.json());

app.use(cors({
    origin: [
  "http://localhost:5173",
  "https://backend-cohort-nine.vercel.app"
],
    methods: ["GET", "POST"],
    credentials: true,
}))


app.get('/', async (req, res) => {

    const result = await runGraph("Write an code for Factorial function in js")

    res.json(result)
})

app.post("/invoke", async (req, res) => {
try{
    const { input } = req.body;
    if(!input || typeof input !== 'string') {
        return res.status(400).json({
            message: "Invalid input",
            success: false
        });
    }

    const result = await runGraph(input);
    

    res.status(200).json({
        message: "Graph executed successfully",
        success: true,
        result
    });

} catch (error : any) {
    res.status(500).json({
        message: "Error executing graph",
        success: false,
        error: error.message
    });
}
});



export default app;