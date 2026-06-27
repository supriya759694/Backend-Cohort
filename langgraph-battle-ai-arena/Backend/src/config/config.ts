import dotenv from 'dotenv';
dotenv.config();

interface Config {
    GOOGLE_API_KEY: string;
    MISTRALAI_API_KEY: string;
    COHERE_API_KEY: string;
}

const config: Config = {
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY || '',
    MISTRALAI_API_KEY: process.env.MISTRALAI_API_KEY || '',
    COHERE_API_KEY: process.env.COHERE_API_KEY || '',
};
console.log("Mistral Key:", !!process.env.MISTRALAI_API_KEY);
console.log("Cohere Key:", !!process.env.COHERE_API_KEY);
export default config;