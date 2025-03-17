# JARVIS - Your Terminal AI Companion

[![Created by Abdullah Adeeb](https://img.shields.io/badge/Created%20by-Abdullah%20Adeeb-blue)](https://www.abdullahadeeb.xyz)


JARVIS is a command-line interface (CLI) application that lets you chat with Google's Gemini AI directly from your terminal. It uses Google's Gemini API via an OpenAI-compatible interface.

Here's a demo video:

[![Demo Video](https://img.youtube.com/vi/C6NMAOtA2Po/hqdefault.jpg)](https://youtu.be/C6NMAOtA2Po?si=p-ZVJ9zDJLZ1K0Eg)

## Features

- **Interactive Chat Mode**: Have a back-and-forth conversation with the AI
- **Single Query Mode**: Get quick answers without entering a chat session
- **Secure API Key Storage**: Your Google API key is stored securely in your home directory

## Installation

```bash
   git clone https://github.com/AbdullahAdeebx/JARVIS
   cd JARVIS
   npm install
   npm link
   jarvis
```

## Usage

### Interactive Chat Mode

Start an interactive chat session with the AI:

```bash
jarvis
```

This will start a conversation where you can type messages and receive responses from the AI. Type `exit`, `quit`, or `bye` to end the session.

### Single Query Mode

Get a quick answer without starting a chat session:

```bash
jarvis "What is the capital of France?"
```

## First-Time Setup

On your first run, JARVIS will prompt you to enter your Google API key. This key will be saved in your home directory (`~/.jarvis_api_key`) for future use.

To get a Google API key:
1. Go to the [Google AI Studio](https://aistudio.google.com/)
2. Create an account or sign in
3. Navigate to the API section and create a new API key

## Troubleshooting

### API Key Issues

If you need to update your API key, you can delete the existing key file and run JARVIS again:

- On Windows: Delete `%USERPROFILE%\.jarvis_api_key`
- On macOS/Linux: Delete `~/.jarvis_api_key`


## For Developers

### Local Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/AbdullahAdeebx/JARVIS
   cd JARVIS
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Link the package locally to test it:
   ```bash
   npm link
   ```

4. Now you can run the CLI tool:
   ```bash
   jarvis
   ```

Or just run:
   ```bash
   git clone https://github.com/AbdullahAdeebx/JARVIS
   cd JARVIS
   npm install
   npm link
   jarvis
   ```
## Requirements

- Node.js 14.0 or higher

## License

MIT 
