import 'dotenv/config'
import readline from 'readline';
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage } from "@langchain/core/messages"; // important

// Create a readline interface to read user input from the console
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
// Initialize the ChatMistralAI model with the specified model name
const model = new ChatMistralAI({
    model: "mistral-small-latest", 
    apiKey: process.env.MISTRAL_API_KEY
});
const messages = [];
function askQuestion(query) {
    return new Promise((resolve) => {
        rl.question(query, resolve);
    });
}

async function main() {
    while (true) {

        const userInput = await askQuestion("You: ");
        if (userInput.toLowerCase() === "exit") {
            console.log("Goodbye!");
            break;
        }

        // Push user message
        messages.push(new HumanMessage(userInput));

        try {
            // Call model
            const response = await model.invoke(messages);

            // Print response
            console.log("AI:", response.content);

            // OPTIONAL: store AI response for memory
            messages.push(response);

        } catch (error) {
            console.error("Error:", error.message);
        }
    }
    rl.close();
}
main();