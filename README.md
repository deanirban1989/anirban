# Anirban De — Personal Portfolio Site

A single-page portfolio site built with plain HTML, CSS, and JavaScript (no build step required). Content is data-driven from `content.json`, so it can be edited either as a file or through the `/admin.html` panel.

## Structure

```
index.html          Page shell — renders content from content.json at load
content.json         All editable text: name, bio, experience, achievements, skills, etc.
admin.html            Password-protected editor UI — edit fields, click Save, live in ~1 min
api/save-content.js    Vercel serverless function: writes content.json back to GitHub
css/style.css         Styling
js/script.js          Fetches content.json, renders the page, nav/scroll/reveal behavior
assets/               Static files (resume PDF, etc.)
robots.txt             Keeps /admin.html and /api/ out of search engines
```

## Editing content

**Option A — the admin panel (recommended):** go to `https://<your-site>/admin.html`, enter your password, edit fields, click **Save & Publish**. Requires one-time setup below and the site must be running on Vercel — the save function needs a serverless backend, which static hosts don't provide.

**Option B — edit the file directly:** open `content.json` (in the repo, or via GitHub's web editor — the pencil icon on github.com) and edit the JSON fields, then commit. No coding needed, just plain text.

## One-time setup for the admin panel

The admin panel needs two secrets set as **Environment Variables** in the Vercel project (Project → Settings → Environment Variables), then a redeploy to pick them up:

1. **`GITHUB_TOKEN`** — a GitHub fine-grained personal access token, scoped to only this repository (`deanirban1989/anirban`), with **Contents: Read and write** permission. Create one at github.com → Settings → Developer settings → Personal access tokens → Fine-grained tokens. Give it an expiration date and rotate it periodically.
2. **`ADMIN_SECRET`** — any password you choose. This is what unlocks `/admin.html`.

After adding both, trigger a redeploy from the Vercel dashboard (Deployments → ⋯ → Redeploy) so the serverless function picks up the new environment variables.

## Before you deploy

- **Résumé**: `assets/Anirban_De_Resume.pdf` is downloadable from the nav bar and the Contact section — replace it any time by swapping the file (keep the same filename).
- **Phone number**: intentionally left off the public site. Add it to `content.json` and `index.html`'s Contact section if you want it listed.

## Run locally

Any static file server works, e.g.:

```
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Deploy

Hosted on Vercel, auto-deploying from the `claude/personal-portfolio-site-0nac31` branch, with `anirbande.com` pointed at it as the custom domain.
