# MMAI Website

Custom multimedia website for game theory, AI, and gaming content.

## Overview

This website hosts instructional videos, game reviews, AI podcasts, and indie games. It leverages external platforms (YouTube, Substack, Patreon, Spotify, Itch.io) for content distribution and monetization, while maintaining a custom-branded static site hosted on Porkbun.

## Tech Stack

- **Astro** — static site generator
- **Tailwind CSS** — styling
- **Porkbun** — domain and hosting
- **GitHub** — source control

## Content Strategy

| Content Type | Platform |
|---|---|
| Instructional videos | YouTube (embedded) |
| Game reviews | YouTube + Blog |
| AI podcasts | Spotify (embedded) |
| Blog posts | This site |
| Indie games | Itch.io (linked) |
| Premium content | Patreon (linked) |

## Getting Started

```bash
git clone <repo-url>
cd mmai-website
npm install
npm run dev
```

## Deployment

Deploy to Porkbun static hosting or GitHub Pages via GitHub Actions.

## Documentation

See [WEBSITE_PLAN.md](./WEBSITE_PLAN.md) for the full architecture and implementation plan.
