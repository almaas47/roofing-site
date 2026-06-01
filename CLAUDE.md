# Peak Ridge Roofing — Project Overview

A marketing and lead-generation site for Peak Ridge Roofing (Salt Lake, Utah, and Tooele counties). When a visitor submits the estimate-request form, an AI-generated confirmation email is sent to the customer and a lead notification is sent to the contractor.

## Architecture

```
roofing-site/
├── src/               # React frontend (Vite)
│   └── components/    # NavBar, Hero, Services, Gallery, Testimonials, ContactForm, Footer
├── server/            # Express API server
│   ├── index.js       # POST /api/contact route
│   ├── agent.js       # Claude API call + Resend email dispatch
│   └── customer-email-prompt.md  # System prompt for the AI email agent
└── public/            # Static assets
```

## AI Email Agent

`server/agent.js` calls `claude-opus-4-7` to generate a personalized confirmation email body for each form submission. The system prompt lives in **`server/customer-email-prompt.md`** — edit that file to change the AI's persona, tone, or guidelines without touching JS code.

Prompt caching (`cache_control: ephemeral`) is applied to the system prompt, so the prompt is written to the cache on the first request and read from cache on all subsequent ones.

Both emails (customer confirmation + contractor lead notification) are sent in parallel via Resend after the AI call resolves.

## Environment Variables

| Variable | Description |
|---|---|
| `ANTHROPIC_API_KEY` | Claude API key |
| `RESEND_API_KEY` | Resend email API key |
| `CONTRACTOR_EMAIL` | Where lead notifications go (default: `matthewtgdiamond@gmail.com`) |
| `FROM_EMAIL` | Sender address (default: `onboarding@resend.dev`) |

## Running Locally

```bash
# Frontend (port 5173)
npm install
npm run dev

# Server (port 3001) — from server/
npm install
npm run dev
```
