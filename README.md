# 🌿 PlantID

An AI-powered plant identification web app. Upload or take a photo of any plant and get instant details — common name, scientific name, origin, care tips, and fun facts — powered by Google's Gemini Vision API.

## Live Demo
[plantid-app.vercel.app](https://plantid-app.vercel.app) <!-- update with your real URL -->

## Features
- Upload images from your device or drag and drop
- Capture directly from camera (mobile and desktop)
- Instant AI identification using Gemini 1.5 Flash
- Plant info: name, family, origin, climate, care tips & facts
- Clean dark UI, fully responsive

## Tech Stack
- React + Vite
- Google Gemini Vision API
- Deployed on Vercel

## Getting Started
```bash
git clone https://github.com/YOUR_USERNAME/plantid-app.git
cd plantid-app
npm install
```

Create a `.env` file:
```
VITE_GEMINI_API_KEY=your_key_here
```

Then run:
```bash
npm run dev
```

## Deploying to Vercel
1. Push to GitHub
2. Import repo on [vercel.com](https://vercel.com)
3. Add `VITE_GEMINI_API_KEY` in Vercel environment variables
4. Deploy — done!

## License
MIT