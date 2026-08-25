# Symmetry

Symmetry is a privacy-first, AI-ready glow-up and **lock-in** tracker. Turn small daily promises into a visible game loop: complete quests, check in, earn XP, build a streak, and climb through ranks.

The MVP is one dependency-light JavaScript codebase:

- A static web app in `www/`, deployable to GitHub Pages.
- A Capacitor shell that can package the same `www/` app as an Android APK.
- Local-only persistence with `localStorage`—no account or backend required.
- An AI Coach surface that currently uses deterministic, local guidance and is ready for a future API integration.

## MVP loop

1. Complete optional focus quests for bonus XP.
2. Tap **Complete daily check-in** once per day to earn 100 XP.
3. Check-in days in a row to grow your streak.
4. Every 100 XP advances your level and updates your rank.
5. Refresh or reopen the app—your progress remains on the device.

## Run the web app

The app is intentionally static. Open `www/index.html` directly for a quick preview, or serve it locally for a realistic browser environment:

```bash
npm install
npm run dev
```

Then visit the local URL printed by `serve`.

## GitHub Pages

The included workflow at `.github/workflows/pages.yml` publishes `www/` on pushes to `main`. In the repository settings, set **Pages → Source** to **GitHub Actions**. The app has no build step, so the Pages artifact is the `www/` directory itself.

## Build an Android APK with Capacitor

Prerequisites: Node.js 18+, Android Studio, an Android SDK, and a configured `ANDROID_HOME`.

```bash
npm install
npm run cap:add:android   # first time only; creates the android/ project
npm run cap:sync
npm run apk:debug
```

The debug APK is generated at:

```text
android/app/build/outputs/apk/debug/app-debug.apk
```

To open the native project in Android Studio:

```bash
npm run cap:open:android
```

After changing files in `www/`, run `npm run cap:sync` again before rebuilding.

## Project structure

```text
www/
  index.html
  main.js
  styles.css
capacitor.config.json
package.json
```

## Privacy and roadmap

Symmetry stores progress locally in the browser or app WebView. The next AI step can replace the local coach prompt generator with a user-selected provider while keeping the same UI contract and avoiding unnecessary personal data collection.
