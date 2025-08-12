# 🖼️ Image Generation & Chat with AI

A full-stack web application that combines AI-powered image generation with conversational capabilities. Built with **Next.js**, **TypeScript**, and integrated with **Google Generative AI** and **Runware APIs**, this project showcases how modern AI tools can be used to create engaging user experiences.

## 🚀 Live Demo
Check it out here: [image-generation-and-chat-with-ai.vercel.app](https://image-generation-and-chat-with-ai.vercel.app)

---

## 📦 Tech Stack

- **Frontend**: Next.js, TypeScript, CSS Modules
- **Backend**: API routes in Next.js
- **AI Services**:
  - Google Generative AI (`GOOGLE_GENERATIVE_AI_API_KEY`)
  - Runware (`RUNWARE_API_KEY`)
- **Deployment**: Vercel

---

## 📁 Project Structure

├── app/ # Main application logic ├── components/ # Reusable UI components ├── hooks/ # Custom React hooks ├── lib/ # Utility functions and API clients ├── public/ # Static assets ├── styles/ # Global and modular styles ├── .gitignore ├── next.config.mjs ├── package.json ├── tsconfig.json


---

## 🛠️ Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sahil485661/image-generation-_and_chat_with_ai.git
   cd image-generation-_and_chat_with_ai
Install dependencies

bash
pnpm install
Configure environment variables

Create a .env.local file and add your API keys:

env
GOOGLE_GENERATIVE_AI_API_KEY=your_google_api_key
RUNWARE_API_KEY=your_runware_api_key
Run the development server

bash
pnpm dev
✨ Features
🎨 Generate images using AI prompts

💬 Chat interface powered by AI

🔐 Secure API key management

⚡ Fast and responsive UI

📌 Deployment
This project is deployed using Vercel. Environment variables are securely managed via Vercel’s dashboard.

📄 License
This project is open-source and available under the MIT License.

🙌 Acknowledgements
Google Generative AI

Runware

Next.js
