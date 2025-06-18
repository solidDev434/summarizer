# SummarizerAI

SummarizerAI harnesses the advanced capabilities of Nebius AI Studio, powered by the deepseek-ai/DeepSeek-V3 model, to summarize lengthy texts into clear, concise, and accurate summaries, preserving key insights and essential information.

## Features
- Summarizing news articles for quick reading.
- Condensing academic papers or reports for study.

## Tech Stacks
- Next.js: A React framework for server-side rendering, API routes, and fast development.
- Nebius AI Studio API Key: Offers access to DeepSeek models like deepseek-ai/DeepSeek-V3 and deepseek-ai/DeepSeek-R1 through an OpenAI-compatible API.
- Tailwind CSS: A utility-first CSS framework for rapid, responsive styling.
- Axios: For making HTTP requests to the Hugging Face API.
- React Hot Toast: For user-friendly feedback notifications.
- Lucide-react: Icon library
- React-spinners: Loader Library

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

The application requires several environment variables to be set:

```
# Nebius API Key 
NEXT_PUBLIC_NEBIUS_API_KEY=
```
