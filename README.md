# Course Mobile

A small **Course App** built with **Expo (React Native)** and **TypeScript**.

This project was implemented as a mobile take-home test to demonstrate:

- Splash/app loading that hydrates a persisted session
- Login flow using MockAPI (email + password)
- Course browsing with search and category filter
- Course details
- Favorites (saved courses) with cross-screen sync
- Comments (add) and likes (toggle) with shared state
- Profile and Edit Profile

## Demo

- Video (Jam #1): https://jam.dev/c/a71ac977-6de6-49ca-ad10-13506aee47ca
- Video (Jam #2): https://jam.dev/c/6bc38af5-bdc6-488f-8a17-e07af5998f9e
- APK (Google Drive): https://drive.google.com/drive/folders/1kiCvXtcn_X924iwUvbGiYV0-Ai1aWZjg?usp=sharing

## Tech Stack

- Expo SDK 54 / React Native 0.81
- TypeScript
- React Navigation (Root Stack + Bottom Tabs)
- Redux Toolkit (centralized app state)
- AsyncStorage (session + local persistence)
- Axios (API client)
- dayjs (date formatting)
- Bun (package manager)
- ESLint + Prettier

## Setup & Run

Prerequisites:

- Node.js LTS
- Bun
- Android Studio (Android) and/or Xcode (iOS)

Install dependencies:

```bash
bun install
```

Start Expo (Expo Go friendly):

```bash
bunx expo start
```

Start using the project script (uses Dev Client):

```bash
bun run start
```

If you prefer npm:

```bash
npm install
npx expo start
```

Notes:

- `bun run start` runs `expo start --dev-client`. Use this if you have a Development Build installed.
- For a fresh setup without a Development Build, prefer `bunx expo start` and open using Expo Go.

## Build APK (EAS Local Preview)

This project includes an `eas.json` profile for `preview` builds. To build an Android APK locally (no cloud build), use EAS Local Builds.

Prerequisites:

- `eas-cli` installed and logged in

Build APK:

```bash
eas build --platform android --profile preview --local --output ./builds/course-mobile-preview.apk
```

Troubleshooting (local build cache issues):

```bash
rm -rf node_modules
rm -rf ~/.npm/_npx
rm -rf ~/.cache/eas-cli
bun install
```

## MockAPI (Endpoint Details)

MockAPI is used for authentication and profile data.

- Base URL is configured in `src/constants/Endpoints/index.ts` as `API_CORE`.
- Endpoints used:
  - `GET /users` (login: find user by email, validate password on client)
  - `PUT /users/:id` (update profile)

Expected user schema (MockAPI `users` resource):

```json
{
  "id": "1",
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456",
  "avatar": "https://...",
  "bio": "Mobile learner"
}
```

Test accounts (create these records in MockAPI `users`):

- John: `john@example.com` / `123456`
- Jane: `jane@example.com` / `123456`

Login behavior:

- Fetch all users from MockAPI
- Match by `email` (case-insensitive)
- Validate password against the returned record
- Persist session locally (`token` + sanitized `user`)

## Data Sources

- Courses are local mock data in `src/mock/courses.ts`.
- Initial comments are local mock data in `src/mock/comments.ts`.
- Favorites, comments, and likes are persisted locally per user.

## State Management

Redux Toolkit is used for predictable shared state across screens:

- `auth`:
  - login/logout
  - session hydration on app start
  - profile update (includes optional remote update to MockAPI)
- `courses`: course items + search query + category filter
- `favorites`: saved course IDs persisted per user
- `comments`: comments-by-course + liked IDs persisted per user

Key persistence keys live in `src/constants/Const/index.tsx` (`StorageKey`).

## Navigation

- Root stack decides between authenticated flow and login based on hydrated auth state
- Authenticated area uses bottom tabs:
  - Home
  - Favorites
  - Profile
- Course Detail is accessible from Home/Favorites
- Edit Profile is accessible from Profile

## Project Structure (Relevant)

```
src/
  api/
  components/
  constants/
  mock/
  navigation/
  screens/
    Home/
    Course/
    Favorite/
    Profile/
    Login/
  store/
    slice/
  type/
  utils/
```

Aliases are configured via `babel.config.js` (e.g. `@api`, `@screens`, `@store`, `@utils`).

## Scripts

- `bun run start` — Start Expo (Dev Client mode)
- `bun run android` — Run Android (native build)
- `bun run ios` — Run iOS (native build)
- `bun run lint` — Lint codebase
- `bun run lint:fix` — Auto-fix lint issues

## Assumptions

- Authentication is simulated (MockAPI users are fetched and validated client-side).
- A “token” is generated locally (not a real auth token) and only used as a session marker.
- Favorites/comments/likes are stored locally per user using AsyncStorage.
- Courses are local mock data (no remote course API in this implementation).

## Improvements (If More Time)

- Move courses/comments to MockAPI and implement real pagination / filtering
- Add tests (reducers, selectors, critical UI flows)
- Improve loading skeletons and offline-friendly caching
- Add more robust form validation and error handling
- Add dark mode and small animations for better UX

## Resources

- Expo: https://docs.expo.dev/
- React Navigation: https://reactnavigation.org/
