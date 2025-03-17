#!/usr/bin/env node

import OpenAI from "openai";
import fs from "fs";
import path from "path";
import readline from "readline";

// Path to store the API key in the user's home directory
const CONFIG_PATH = path.join(process.env.HOME || process.env.USERPROFILE, ".jarvis_api_key");

/**
 * Retrieves the Google API key, either from a stored file or by prompting the user.
 * @param {readline.Interface} rl - The readline interface to use for prompting.
 * @returns {Promise<string>} The API key.
 */
async function getApiKey(rl) {
    try {
        if (fs.existsSync(CONFIG_PATH)) {
            const key = fs.readFileSync(CONFIG_PATH, "utf-8").trim();
            if (key) return key;
        }
    } catch (error) {
        console.log("Error reading API key:", error.message);
        console.log("You'll need to enter your API key again.");
    }

    return new Promise((resolve) => {
        rl.question("Enter your Google API key: ", (key) => {
            try {
                fs.writeFileSync(CONFIG_PATH, key.trim());
                console.log("API key saved successfully.");
            } catch (error) {
                console.log("Warning: Could not save API key:", error.message);
                console.log("You'll need to enter your API key again next time.");
            }
            resolve(key.trim());
        });
    });
}

/**
 * Sends a list of messages to the AI and returns the response.
 * @param {Array<{role: string, content: string}>} messages - The conversation history.
 * @param {readline.Interface} rl - The readline interface to use for prompting.
 * @returns {Promise<string>} The AI's response.
 */
async function chatWithAI(messages, rl) {
    try {
        const apiKey = await getApiKey(rl);
        const openai = new OpenAI({
            apiKey,
            baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
        });

        const response = await openai.chat.completions.create({
            model: "gemini-2.0-flash",
            messages,
        });

        return response.choices[0].message.content;
    } catch (error) {
        console.error("Error communicating with AI:", error.message);
        if (error.response) {
            console.error("API Error:", error.response.data);
        }
        return "Sorry, I encountered an error while processing your request. Please try again.";
    }
}

/**
 * Runs the interactive chat mode, allowing a back-and-forth conversation with the AI.
 */
async function chatMode() {
    // Create a single readline interface for the entire session
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    // Initialize conversation with a system message
    const messages = [{ role: "system", content: "You are a helpful assistant." }];
    
    try {
        const askQuestion = () => {
            return new Promise((resolve) => {
                rl.question("You: ", (input) => resolve(input));
            });
        };

        while (true) {
            const userInput = await askQuestion();

            // Check for exit commands
            if (userInput.toLowerCase() === "exit" || 
                userInput.toLowerCase() === "quit" || 
                userInput.toLowerCase() === "bye") {
                rl.close();
                console.log("JARVIS: Goodbye.");
                break;
            }

            // Add user input to the conversation history
            messages.push({ role: "user", content: userInput });

            // Get the AI's response without showing "thinking" message
            const response = await chatWithAI(messages, rl);
            console.log("JARVIS:", response);

            // Add AI response to the conversation history
            messages.push({ role: "assistant", content: response });
        }
    } catch (error) {
        console.error("An error occurred:", error.message);
        rl.close();
    }
}

/**
 * Handles a single query mode.
 * @param {string} query - The query to send to the AI.
 */
async function singleQueryMode(query) {
    // Create a readline interface for API key input if needed
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    
    try {
        const messages = [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: query },
        ];
        const response = await chatWithAI(messages, rl);
        console.log("JARVIS:", response);
    } finally {
        rl.close();
    }
}

// Main execution logic
(async () => {
    try {
        const args = process.argv.slice(2);

        if (args.length === 0) {
            // No arguments: Start interactive chat mode
            await chatMode();
        } else {
            // Arguments provided: Single query mode
            const query = args.join(" ");
            await singleQueryMode(query);
        }
    } catch (error) {
        console.error("Fatal error:", error.message);
        process.exit(1);
    }
})(); 