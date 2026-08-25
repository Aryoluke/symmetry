# Symmetry

A private, offline-first training system for GitHub Pages and Capacitor. The app is a single vanilla JavaScript codebase in `www/` and has no runtime dependencies or network calls.

## Features

- Dark modern minimalist interface with green accent, responsive mobile layout, and dark/light toggle.
- LocalStorage persistence for profile, deterministic body scan, plan, workout logs, XP, streaks, achievements, photos, measurements, settings, and backups.
- Body Scan onboarding accepts a camera/upload photo or selected muscle groups. A deterministic local engine identifies three strongest and three priority muscle groups and generates a goal/equipment-aware nine-week plan.
- 100+ exercise library across muscle groups, including weighted movements and calisthenics progressions: pull-ups, push-ups, dips, muscle-ups, front lever, planche, handstand, core, mobility, and more.
- Set/rep/weight logging, supersets, rest timer, offline operation, progressive overload suggestions, daily plan checkoff, weekly focus, and plan bonus XP.
- Gamification: XP, levels/ranks, streak widget, achievements, exercise levels, shareable challenge code, social workout/achievement cards, and leaderboard placeholder.
- Progress: local progress photos with comparison, measurements, weight entries, volume chart, and muscle development map.
- AI Coach tab with deterministic local coaching replies and daily motivation; JSON export/import.

## Run and test

Open `www/index.html` directly or serve the repository root with any static server. GitHub Pages continues to use `.github/workflows/pages.yml`; Capacitor continues to use `capacitor.config.json` and `www/` as its web directory. The app is intentionally local-only and does not provide medical or image-analysis claims.
