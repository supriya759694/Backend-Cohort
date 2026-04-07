import 'dotenv/config'
import readline from 'readline';
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage } from "@langchain/core/messages";
import { tool } from "@langchain/core/tools";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { sendEmail } from './mail.service.js';
import z from 'zod';

const emailTool = tool(
    sendEmail,
    {
        name: "emailTool",
        description: "Use this tool to send emails",
        schema: z.object({
            to: z.string().describe("Recipient's email address"),
            subject: z.string().describe("Subject of the email"),
            html: z.string().describe("HTML content of the email").optional(),
            text: z.string().describe("Plain text content of the email").optional(),
        })
    }
);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const model = new ChatMistralAI({
    model: "mistral-small-latest",
    apiKey: process.env.MISTRAL_API_KEY
});

const agent = createReactAgent({
    llm: model,
    tools: [emailTool],
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

        if (!userInput.trim()) {
            console.log("⚠️ Please enter a message");
            continue;
        }

        if (userInput.toLowerCase() === "exit") {
            console.log("Goodbye!");
            break;
        }

        messages.push(new HumanMessage(userInput));

        const response = await agent.invoke({
            messages: messages,
        });

        const aiMessage = response.messages[response.messages.length - 1];
        console.log("\x1b[35mAI:\x1b[0m", aiMessage.content);

        messages.push(aiMessage);
    }
    rl.close();
} 
main();