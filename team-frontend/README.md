# SmartTeam.AI — Smart Team Formation Using DAA Algorithms

A futuristic, AI-inspired frontend for an intelligent technical team recommendation platform powered by Design & Analysis of Algorithms (searching, sorting, greedy optimization, compatibility scoring).

This frontend is **strictly compatible** with the Spring Boot + MongoDB backend defined in the integration contract below.

---

## 1. Project Overview

SmartTeam.AI lets students and developers:

- Create technical profiles (skills, domains, experience).
- Search developers by skills.
- Generate optimized teams via a DAA-powered recommendation engine.
- View compatibility scores and ranked team members.
- Manage their developer profile.

The visual experience is a premium dark-themed SaaS-style product with glassmorphism, gradient accents, animated charts, and smooth Framer Motion transitions.

---

## 2. Frontend Architecture

```
src/
├── components/
│   ├── common/        # Reusable UI (TagInput, etc.)
│   ├── layout/        # AppShell — authenticated layout
│   └── ui/            # Shadcn primitives (Button, Input, …)
├── context/           # AuthContext (JWT + user state)
├── lib/               # api.ts — centralized Axios client + typed API services
├── routes/            # File-based routes (TanStack Router)
│   ├── __root.tsx
│   ├── index.tsx          # Landing page (/)
│   ├── login.tsx          # /login
│   ├── register.tsx       # /register
│   ├── _app.tsx           # Auth-guarded layout
│   ├── _app.dashboard.tsx
│   ├── _app.team-finder.tsx
│   ├── _app.recommendation.tsx
│   └── _app.profile.tsx
└── styles.css         # Design tokens (futuristic dark theme)
```

> **Router note:** This template uses **TanStack Router** (file-based routing) rather than React Router DOM. Navigation primitives (`Link`, `useNavigate`) live in `@tanstack/react-router`. The original spec mentioned React Router; TanStack Router is used because it ships with the template and offers identical functionality plus type-safe routes.

### Folder responsibilities

| Folder | Purpose |
| --- | --- |
| `components/common` | Generic widgets shared across pages (e.g. `TagInput`). |
| `components/layout` | App shell — header, nav, responsive mobile menu, outlet. |
| `components/ui` | Shadcn UI primitives styled to the design system. |
| `context` | React Contexts (auth/JWT state, persisted to localStorage). |
| `lib/api.ts` | Axios instance, JWT interceptor, typed API service layer. |
| `routes/` | TanStack file-based routes — one file per URL. |
| `styles.css` | Design tokens (oklch colors, gradients, glow, glass). |

---

## 3. Backend Integration

Base URL is read from `VITE_API_BASE_URL` (defaults to `http://localhost:8080`).

### Endpoint mapping

| Action | Method | Endpoint | Service call |
| --- | --- | --- | --- |
| Register | POST | `/api/auth/register` | `AuthAPI.register(payload)` |
| Login | POST | `/api/auth/login` | `AuthAPI.login(payload)` |
| Recommend team | POST | `/api/team/recommend` | `TeamAPI.recommend(skills)` |
| List profiles | GET | `/api/profile/all` | `ProfileAPI.all()` |
| Get profile | GET | `/api/profile/{id}` | `ProfileAPI.get(id)` |
| Create profile | POST | `/api/profile/create` | `ProfileAPI.create(data)` |
| Update profile | PUT | `/api/profile/update/{id}` | `ProfileAPI.update(id, data)` |
| Delete profile | DELETE | `/api/profile/delete/{id}` | `ProfileAPI.delete(id)` |

### Exact field names used (do not rename)

**Auth response:** `token`, `userId`, `email`, `fullName`
**Register payload:** `fullName`, `email`, `password`, `college`, `city`, `experienceLevel`, `skills[]`, `domains[]`
**Recommend payload:** `requiredSkills[]`
**Recommend response:** `recommendedTeam[]` (each `{ id, name, role, skillScore }`) + `compatibilityScore`

These are the exact keys the frontend reads/writes — the backend contract is honored verbatim.

---

## 4. JWT Authentication Flow

1. User registers or logs in → backend returns `{ token, userId, email, fullName }`.
2. `AuthContext` persists this object in `localStorage` under keys `stfs_token` and `stfs_user`.
3. The Axios request interceptor automatically attaches `Authorization: Bearer <token>` to every outgoing request.
4. The response interceptor clears storage on `401` responses.
5. The `_app` layout route guards all authenticated pages — unauthenticated users are redirected to `/login`.

---

## 5. Recommendation Flow

```
User selects required skills          (Team Finder page)
        ↓
POST /api/team/recommend  { requiredSkills: [...] }
        ↓
Backend runs:  Search → Sort → Greedy pick → Score
        ↓
Response { recommendedTeam, compatibilityScore }
        ↓
Frontend stores in sessionStorage and navigates to /recommendation
        ↓
Recommendation page renders animated team cards + compatibility gauge
```

---

## 6. Environment Variables

Create a `.env` file at the project root:

```
VITE_API_BASE_URL=http://localhost:8080
```

Restart the dev server after changes.

---

## 7. Installation & Running

```bash
# Install
bun install              # or npm install

# Dev server
bun run dev              # or npm run dev

# Production build
bun run build
```

Make sure the Spring Boot backend is running on the URL configured in `VITE_API_BASE_URL` (default `http://localhost:8080`). CORS on the backend must allow the dev origin (Vite typically runs on `http://localhost:5173` or `http://localhost:8080` depending on config).

---

## 8. State Management

- **Auth** — React Context (`AuthContext`) + `localStorage` persistence.
- **Recommendation result** — `sessionStorage` (`stfs_last_recommendation`) so the result page can render without re-calling the API.
- **Server data** — `@tanstack/react-query` is configured in the root provider and ready for caching expansions.

---

## 9. Responsive Design

- Mobile-first Tailwind utility classes.
- AppShell collapses navigation into a slide-down menu under `md`.
- All grids reflow to one column on mobile.
- Forms use `grid-cols-1 sm:grid-cols-2` patterns for graceful collapse.

---

## 10. Animations

Framer Motion is used for:

- Hero and section entrance animations.
- Card hover lift, stagger reveals on the recommendation page.
- Mobile menu expansion.
- Recharts gauge / bars animate via their built-in motion.

---

## 11. Pages

| Route | Description |
| --- | --- |
| `/` | Marketing landing page with hero, features, algorithm flow. |
| `/login` | Glassmorphism JWT login. |
| `/register` | Multi-section developer profile registration. |
| `/dashboard` | Welcome, analytics cards, skill demand chart, compatibility gauge. |
| `/team-finder` | Skill multi-select + recommendation generation. |
| `/recommendation` | Animated team cards + compatibility meter + insights. |
| `/profile` | View/edit profile (skills, domains, experience). |

---

## 12. Integration Notes for AI IDEs / Future Tooling

- All API I/O is centralized in `src/lib/api.ts` — change base URL or auth strategy in one place.
- Types (`AuthUser`, `RegisterPayload`, `RecommendationResponse`, `Profile`, etc.) mirror backend DTOs exactly. Update these if the backend contract evolves.
- Routes are file-based — adding a new page is a single new file in `src/routes/`.
- Design tokens live in `src/styles.css` (oklch) — extending the palette is a one-file change.
- The recommendation page reads from `sessionStorage`; an AI IDE can swap this for a React Query cache without changing call-sites.

---

## 13. Expected Backend Requirements

- Spring Boot + MongoDB.
- CORS configured for the frontend origin.
- JWT auth returning `{ token, userId, email, fullName }`.
- `POST /api/team/recommend` returning `{ recommendedTeam: [...], compatibilityScore: number }`.
- Profile CRUD under `/api/profile/*`.

---

Built with React 19, TypeScript, TailwindCSS v4, TanStack Router, Framer Motion, Recharts, Axios, and Lucide icons.
