# Peak Ridge Roofing — Marketing Site

A single-page marketing website for a fictional roofing company, built as a portfolio project.

**Stack:** React 19 · Vite · Tailwind CSS 4 · Formspree

## Features

- Sticky responsive navbar with mobile hamburger menu
- Hero section with background photo and animated stat counters
- Services grid with Heroicons SVG icons
- Testimonials with scroll-triggered fade-in animations
- Project gallery section
- Contact form via Formspree with client-side validation
- SEO meta tags and Open Graph

## Getting Started

```bash
npm install
npm run dev
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your Formspree form ID:

```bash
cp .env.example .env.local
```

| Variable | Description |
|---|---|
| `VITE_FORMSPREE_ID` | Your Formspree form ID (from formspree.io) |
