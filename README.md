# Symmetry

A private, offline-first training
system for GitHub Pages and Capacitor. The
app is a single vanilla JavaScript codebase in
`www/` and has no runtime dependencies or network calls.

## Features

- Dark modern minimalist interface with green accent, responsive
mobile layout, and dark/light toggle.
- LocalStorage persistence for profile, deterministic
body scan, plan, workout logs, XP, streaks, achievements, photos, measurements, settings, and backups.
- Body Scan onboarding accepts a camera/upload photo or selected muscle groups. A deterministic local engine identifies three strongest and three priority muscle groups and generates a goal/equipment-aware nine-week plan.
- 100+ exercise library across muscle groups, including weighted movements and calisthenics progressions: pull-ups, push-ups, dips, muscle-ups, front lever, planche, handstand, core, mobility, and more.
- Set/rep/weight logging, supersets, rest timer, offline operation, progressive overload suggestions, daily plan checkoff, weekly focus, and plan bonus XP.
- Gamification: XP, levels/ranks, streak widget, achievements, exercise levels, shareable challenge code, social workout/achievement cards, and leaderboard placeholder.
- Progress: local progress photos with comparison, measurements, weight entries, volume chart, and muscle development map.
- AI Coach tab with deterministic local coaching replies and daily motivation; JSON export/import.

## Run and test

Open `www/index.html` directly or serve the repository root with any static server. GitHub Pages continues to use `.github/workflows/pages.yml`; Capacitor continues to use `capacitor.config.json` and `www/` as its web directory. The app is intentionally local-only and does not provide medical or image-analysis claims.

## Build an Android debug APK

### Prerequisites

- Node.js 20 and npm. The Android workflow uses Node.js 20; install a Node.js distribution that includes npm.
- The Android SDK, with `ANDROID_HOME` or `ANDROID_SDK_ROOT` configured and the SDK packages required by the generated Capacitor Android project installed. Accept the Android SDK licenses before building.
- Java JDK 17. Capacitor's Android project includes a Gradle wrapper, so the commands below use `android/gradlew`; a separate global Gradle installation is not required.

### Local build

From the repository root, run these commands in a macOS/Linux/POSIX shell:

```sh
npm install
npx cap add android
npx cap sync android
(cd android && ./gradlew assembleDebug --no-daemon --stacktrace)
```

`npx cap add android` creates the native Android project and is needed only the first time. If the `android/` directory already exists, skip that command. For subsequent builds, run:

```sh
npm install
npx cap sync android
(cd android && ./gradlew assembleDebug --no-daemon --stacktrace)
```

The debug APK is written to:

```text
android/app/build/outputs/apk/debug/app-debug.apk
```

The equivalent npm shortcut for a subsequent build is:

```sh
npm run apk:debug
```

### GitHub Actions

`.github/workflows/android-build.yml` is the one-command/CI option. In GitHub, open **Actions**, select **Build Android APK**, and choose **Run workflow**. It installs Node.js 20 and JDK 17, installs dependencies, creates and syncs the Capacitor Android project, runs the debug Gradle build, verifies the APK at `android/app/build/outputs/apk/debug/app-debug.apk`, and uploads the `symmetry-debug-apk` artifact.
