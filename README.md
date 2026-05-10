# Corn — Kids PWA

A kid-friendly Progressive Web App with memory matching, photo puzzles, a tap game, and curated YouTube videos. Designed to install to your iPhone home screen and work offline (except videos, which need internet).

## What's included

- **Memory Match** — flip cards to find pairs (works offline)
- **Photo Puzzles** — slide-puzzle game using your own photos or built-in defaults; 3×3, 4×4, or 5×5 difficulty (works offline)
- **Tap Game** — tap animals as they appear, score climbs (works offline)
- **Videos** — embedded YouTube player with only the videos you choose (needs internet)

## How to add YouTube videos

Open `index.html` and find the `VIDEOS` array near the top of the `<script>` section:

```js
const VIDEOS = [
  { id: 'D1ULRHX-_2g', title: 'Baby Shark Dance' },
  // Add more here...
];
```

Add entries with the YouTube video ID (the part after `v=` in the URL) and a title.

## Hosting options (pick one)

Because iOS service workers require HTTPS, you need to host the files somewhere — opening the HTML file directly from disk on your phone won't enable offline mode.

### Option 1: Netlify Drop (easiest, ~30 seconds)
1. Go to https://app.netlify.com/drop
2. Drag the entire `kids-app` folder onto the page
3. You'll get a URL like `https://random-name.netlify.app`
4. Open that on your iPhone in Safari → Share → Add to Home Screen

### Option 2: GitHub Pages (free, permanent)
1. Create a GitHub repo, upload these files
2. Settings → Pages → Deploy from main branch
3. Use the resulting URL

### Option 3: Local Wi-Fi (no internet hosting needed)
Run a local web server on your Mac and connect from your phone over Wi-Fi:
```bash
cd kids-app
python3 -m http.server 8000
```
Then on your iPhone (same Wi-Fi), visit `http://YOUR-MAC-IP:8000`. Note: iOS won't let you "Add to Home Screen" with offline support over plain HTTP — you'd need to set up local HTTPS for that.

## Installing on your iPhone

1. Open the hosted URL in **Safari** (not Chrome — only Safari supports Add to Home Screen on iOS)
2. Tap the **Share** button
3. Scroll down, tap **Add to Home Screen**
4. Tap **Add**

The app icon appears on your home screen and opens fullscreen with no Safari UI.

## Offline behavior

- First time you open the app, it downloads itself and caches everything
- After that, games work with no internet at all
- Videos show an offline warning when you have no connection
- Uploaded photos are stored locally on the device (IndexedDB), so they persist and work offline

## Customizing

- **Colors**: Edit the CSS variables at the top of `index.html` (`--sun`, `--sky`, `--berry`, etc.)
- **Title**: Search for "Corn" in `index.html` and `manifest.json`
- **Icons**: Replace `icon-192.png` and `icon-512.png` with your own (same dimensions)
- **Memory game emojis**: Edit the `MEMORY_EMOJIS` array
- **Tap game emojis**: Edit the `TAP_EMOJIS` array
