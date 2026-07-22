# AI Portfolio Capstone

A modern React + Vite portfolio website for Muzainah Faisal, featuring a responsive multi-page experience, a dark/light theme toggle, and an AI assistant page powered by a configurable LLM API.

## Project Overview

This project is a professional AI fluency capstone website built with React, Vite, and React Router. It showcases personal information, education, internship experience, skills, featured projects, contact details, and an interactive AI assistant experience.

## Features

- Responsive multi-page portfolio layout
- Home, About, Skills, Projects, Contact, and Assistant pages
- Dark/light mode with local storage persistence
- Reusable navigation and footer components
- Modern chat-style AI assistant UI
- Configurable LLM API integration via environment variables
- Clean, professional styling with hover effects and animations

## Technologies Used

- React
- Vite
- React Router
- CSS
- Environment-based API configuration

## Project Structure

- src/pages: page-level components
- src/components: reusable UI components
- src/App.jsx: app routing and layout shell
- src/App.css: main site styling

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Create your environment file

Create a file named .env in the project root and add your values:

```env
VITE_LLM_API_KEY=your_api_key_here
VITE_LLM_API_URL=https://api.openai.com/v1/chat/completions
VITE_LLM_MODEL=gpt-4o-mini
```

You can also use the provided example file:

```bash
copy .env.example .env
```

### 3. Run the development server

```bash
npm run dev
```

The app will open locally in your browser.

## Available Scripts

```bash
npm run dev
npm run build
npm run preview
```

## Development Commands

- Start dev server: npm run dev
- Build for production: npm run build
- Preview production build: npm run preview

## Environment Variables

| Variable | Description |
| --- | --- |
| VITE_LLM_API_KEY | API key for the LLM provider |
| VITE_LLM_API_URL | Endpoint for the chat completions API |
| VITE_LLM_MODEL | Model name to use for the assistant |

## Deployment

### Vercel

1. Push the project to GitHub.
2. Create a new Vercel project.
3. Import the repository.
4. Set the environment variables in Vercel project settings.
5. Deploy.

### Netlify

1. Build the project with npm run build.
2. Deploy the dist folder to Netlify.
3. Add environment variables in the Netlify dashboard.

## Screenshots

Add screenshots here as the project evolves:

- Home page
- About page
- Skills page
- Projects page
- Contact page
- AI Assistant page

## Notes

- Keep the API key private and do not commit your .env file to GitHub.
- The assistant UI is ready for API integration and can be extended with richer prompts and responses.
