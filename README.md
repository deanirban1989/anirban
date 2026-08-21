# Anirban De — Personal Portfolio Site

A single-page portfolio site built with plain HTML, CSS, and JavaScript (no build step required).

## Structure

```
index.html        Page content
css/style.css      Styling
js/script.js       Nav behavior, scroll-spy, reveal animations, counters
assets/            Static files (resume PDF, etc.)
```

## Before you deploy

- **LinkedIn URL**: open `js/script.js` and set `LINKEDIN_URL` to your public profile link.
- **Résumé**: `assets/Anirban_De_Resume.pdf` is downloadable from the nav bar and the Contact section — replace it any time by swapping the file (keep the same filename, or update the `href` in `index.html`).
- **Phone number**: intentionally left off the public site. Add it to the Contact section in `index.html` if you want it listed.

## Run locally

Any static file server works, e.g.:

```
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Deploy

Works as-is on GitHub Pages, Vercel, Netlify, or any static host — just point it at the repo root.
