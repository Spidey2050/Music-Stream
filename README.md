# Music-Stream

Static music player site built with plain HTML, CSS, and JavaScript.

## Deploy to GitHub Pages

This repository includes a GitHub Actions workflow at `/home/runner/work/Music-Stream/Music-Stream/.github/workflows/deploy-pages.yml` that deploys the site on every push to `main`.

### One-time repository setup

1. Open your repository on GitHub.
2. Go to **Settings → Pages**.
3. Set **Source** to **GitHub Actions**.

### Deploy

1. Push changes to the `main` branch.
2. Wait for the **Deploy static site to GitHub Pages** workflow to complete.
3. Open the published URL shown in **Settings → Pages**.

### Verify

1. Confirm the UI loads (background image, controls, clock).
2. Press Play and verify YouTube audio starts.
3. Test previous/next track buttons and progress timer updates.
