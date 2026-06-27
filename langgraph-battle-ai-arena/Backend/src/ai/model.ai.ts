import { ChatGoogle } from "@langchain/google";
import { ChatMistralAI} from '@langchain/mistralai';
import { ChatCohere } from "@langchain/cohere";
import config  from "../config/config.js";


export const geminiModel = new ChatGoogle({
    model : "gemini-flash-latest",
    apiKey:config.GOOGLE_API_KEY,
})

export const mistralAIModel = new ChatMistralAI({
    model : 'mistral-medium-latest',
    apiKey: config.MISTRALAI_API_KEY,
})
export const cohereModel = new ChatCohere({
    model : 'command-a-03-2025',
    apiKey: config.COHERE_API_KEY,
})

const prompt = "Write a factorial function in JavaScript.";

console.log("Calling Gemini...");
const gemini = await geminiModel.invoke(prompt);
console.log("Gemini finished.");

console.log("Calling Mistral...");
const mistral = await mistralAIModel.invoke(prompt);
console.log("Mistral finished.");

console.log("Calling Cohere...");
const cohere = await cohereModel.invoke(prompt);
console.log("Cohere finished.");
