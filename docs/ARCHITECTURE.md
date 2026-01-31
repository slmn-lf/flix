# 🏗️ Flix Architecture & Type System

**Last Updated:** 22 Januari 2026

---

## 📋 Table of Contents

1. [Project Overview](#-project-overview)
2. [Folder Structure & Responsibilities](#-folder-structure--responsibilities)
3. [Type Organization Pattern](#-type-organization-pattern)
4. [Data Flow](#-data-flow)
5. [Key Principles](#-key-principles)
6. [Import Patterns](#-import-patterns)
7. [How to Extend](#-how-to-extend)

---

## 🎯 Project Overview

**Flix** adalah Netflix clone yang dibangun dengan:

- **Frontend:** React 19 + TypeScript
- **Build Tool:** Vite 7
- **Styling:** Tailwind CSS
- **Routing:** React Router 7
- **API:** TMDB (The Movie Database)

Aplikasi menampilkan film dan series TV dengan UI modern, search functionality, dan responsive design.

---

## 📁 Folder Structure & Responsibilities

### Hierarchy & Dependencies

```
┌─────────────────────────────────────────────────────────────────┐
│                      USER INTERFACE                             │
│         (React Components, Pages, Layouts)                      │
│    src/pages/ | src/components/ | src/features/*/               │
└─────────────────────┬───────────────────────────────────────────┘
                      │ (uses)
┌─────────────────────▼───────────────────────────────────────────┐
│                  CUSTOM HOOKS LAYER                             │
│              (State & data management)                          │
│                    src/hooks/                                   │
└─────────────────────┬───────────────────────────────────────────┘
                      │ (calls)
┌─────────────────────▼───────────────────────────────────────────┐
│                  SERVICES LAYER                                 │
│         (High-level API functions, business logic)              │
│   src/services/ | src/features/*/services/                      │
└─────────────────────┬───────────────────────────────────────────┘
                      │ (uses)
┌─────────────────────▼───────────────────────────────────────────┐
│                 API CLIENT LAYER                                │
│            (HTTP requests, authentication)                      │
│                    src/api/                                     │
└─────────────────────┬───────────────────────────────────────────┘
                      │ (reads from)
┌─────────────────────▼───────────────────────────────────────────┐
│            ENVIRONMENT & CONFIG                                 │
│               (API keys, URLs, env vars)                        │
│                   src/config/                                   │
└─────────────────────┬───────────────────────────────────────────┘
                      │ (makes requests to)
┌─────────────────────▼───────────────────────────────────────────┐
│                  EXTERNAL API                                   │
│         (TMDB API - themoviedb.org)                             │
└─────────────────────────────────────────────────────────────────┘
```

### Folder Descriptions

| Folder            | Purpose                                      | Exports                |
| ----------------- | -------------------------------------------- | ---------------------- |
| `src/api/`        | HTTP client & endpoint definitions           | Functions only         |
| `src/config/`     | Environment variables & configuration        | Configuration objects  |
| `src/types/`      | **Type definitions (ALL PUBLIC TYPES HERE)** | Types only             |
| `src/services/`   | Generic API service layer, domain-agnostic   | Functions only         |
| `src/features/`   | Feature-specific components & services       | Components & functions |
| `src/components/` | Reusable UI components                       | Components only        |
| `src/hooks/`      | Custom React hooks                           | Hook functions only    |
| `src/layouts/`    | Page layout templates/wrappers               | Components only        |
| `src/pages/`      | Routed page components                       | Components only        |
| `src/utils/`      | Pure helper functions & constants            | Functions & constants  |

---

## 🎓 Type Organization Pattern

### The Core Principle

```
┌────────────────────────────────────────────────────────────────────┐
│                       PUBLIC TYPES LAYER                           │
│           (Centralized location for all shared types)              │
│                         📁 src/types/                              │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│  ✅ Domain Models (from API):                                     │
│     • Movie               (src/types/movie.ts)                    │
│     • TV                 (src/types/tv.ts)                        │
│     • FeaturedMovie      (src/types/featured.ts) ✨ NEW           │
│                                                                    │
│  ✅ Shared Base Types:                                             │
│     • MediaBase           (src/types/common.ts)                   │
│     • PaginatedResponse   (src/types/common.ts)                   │
│                                                                    │
│  ✅ Component Props:                                               │
│     • MovieCardProps      (src/types/movie-card.ts)              │
│                                                                    │
│  ✅ Hook State Types:                                              │
│     • UseFetchState<T>    (src/types/hooks.ts) ✨ NEW            │
│                                                                    │
│  ✅ Utility Types:                                                 │
│     • ImageSize           (src/types/image.ts) ✨ NEW            │
│     • ImageType           (src/types/image.ts) ✨ NEW            │
│     • IMAGE_SIZES (const) (src/types/image.ts) ✨ NEW            │
│                                                                    │
│  ✅ Barrel Export:                                                 │
│     • src/types/index.ts  (all types) ✨ NEW                     │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
                              ↑
                        (imported by)
                              │
┌────────────────────────────────────────────────────────────────────┐
│                 INTERNAL API TYPES LAYER                           │
│           (Private to API layer, NOT exported)                    │
│                    📁 src/api/types.ts                            │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│  ❌ NOT public (used only by services):                            │
│     • VideoResponse       (TMDB API response)                     │
│     • ImageResponse       (TMDB API response)                     │
│     • HttpMethod          (HTTP method type)                      │
│     • RequestOptions      (for tmdbClient)                        │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

### Type Placement Rule

```typescript
If type is used in > 1 file or module
  → Place in src/types/ (PUBLIC)

If type is only for API responses (internal)
  → Place in src/api/types.ts (INTERNAL)

If type is component-specific only
  → Keep in component file (OK, but optional)
```

---

## 🔄 Data Flow

### Complete User Action Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│ 1. USER INTERACTS WITH UI                                           │
│    Example: User clicks "Load More Movies" button                   │
└─────────────────┬───────────────────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────────────────┐
│ 2. COMPONENT CALLS HOOK                                             │
│    Example: useFetch(() => getPopularMovies())                      │
│    Location: src/components/*.tsx or src/pages/*.tsx                │
│    Type: Hook returns UseFetchState<Movie[]>                        │
└─────────────────┬───────────────────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────────────────┐
│ 3. HOOK CALLS SERVICE FUNCTION                                      │
│    Example: movieService.getPopularMovies()                         │
│    Location: src/services/movieService.ts                           │
│    Returns: Promise<Movie[]>                                        │
└─────────────────┬───────────────────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────────────────┐
│ 4. SERVICE TRANSFORMS DATA                                          │
│    • Calls tmdbClient<TMDBMovieResponse>()                          │
│    • Maps response to Movie type (domain model)                     │
│    • Returns Movie[]                                                │
│    Location: src/services/movieService.ts                           │
└─────────────────┬───────────────────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────────────────┐
│ 5. TMDB CLIENT MAKES HTTP REQUEST                                   │
│    • Constructs URL from endpoint + params                          │
│    • Adds Authorization header                                      │
│    • Makes fetch call                                               │
│    Location: src/api/tmdbClient.ts                                  │
│    Returns: T (generic response type)                               │
└─────────────────┬───────────────────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────────────────┐
│ 6. CONFIG PROVIDES CREDENTIALS                                      │
│    • VITE_TMDB_BASE_URL                                             │
│    • VITE_TMDB_ACCESS_TOKEN                                         │
│    • VITE_TMDB_IMAGE_BASE_URL                                       │
│    Location: src/config/env.ts                                      │
└─────────────────┬───────────────────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────────────────┐
│ 7. EXTERNAL TMDB API                                                │
│    • Processes request                                              │
│    • Returns JSON response with movie data                          │
│    • Example: { id, title, overview, poster_path, ... }            │
└─────────────────┬───────────────────────────────────────────────────┘
                  │
└─────────────────▼───────────────────────────────────────────────────┐
│ 8. RESPONSE FLOWS BACK UP THE CHAIN                                 │
│    tmdbClient returns → Service transforms → Hook updates state     │
│    → Component re-renders with new data                             │
│    UI shows: Movie list with posters, titles, etc                   │
└─────────────────────────────────────────────────────────────────────┘
```

### Type Flow in Data Flow

```
Component (uses Movie[] type from src/types/movie.ts)
  ↓
Hook (returns UseFetchState<Movie[]> from src/types/hooks.ts)
  ↓
Service (transforms response to Movie[] using src/types/movie.ts)
  ↓
API Client (uses VideoResponse, ImageResponse from src/api/types.ts internally)
  ↓
Config (provides strings, no types exported)
  ↓
TMDB API (returns raw JSON)
```

---

## 🎯 Key Principles

### 1. Separation of Concerns

Each layer has a single responsibility:

```
API Layer (src/api/)
  ↓ Knows: HTTP, authentication, endpoints
  ↓ Doesn't know: Business logic, domain models, UI

Service Layer (src/services/)
  ↓ Knows: How to transform API responses to domain types
  ↓ Doesn't know: React, UI, HTTP details

Hook Layer (src/hooks/)
  ↓ Knows: React lifecycle, state management
  ↓ Doesn't know: API details, business logic details

Component Layer (src/components/, src/pages/)
  ↓ Knows: UI rendering, user interaction
  ↓ Doesn't know: How data is fetched
```

### 2. Type Centralization

```
WRONG ❌
import type { Movie } from "@/services/movieService";
import type { UseFetchState } from "@/hooks/useFetch";
import type { ImageSize } from "@/utils/image";

CORRECT ✅
import type { Movie, UseFetchState, ImageSize } from "@/types";
// or with barrel export:
import type { Movie } from "@/types/movie";
import type { UseFetchState } from "@/types/hooks";
import type { ImageSize } from "@/types/image";
```

### 3. API Response vs Domain Types

```
API Response (Internal - src/api/types.ts)
  ├─ VideoResponse
  │  └─ { results: [{ id, key, name, site, type }] }
  └─ ImageResponse
     └─ { logos?: [{ file_path, vote_average }] }

Domain Type (Public - src/types/)
  └─ FeaturedMovie
     ├─ id: number
     ├─ title: string
     ├─ trailerKey: string | null
     ├─ logoUrl: string | null
     └─ (transformed from API responses)
```

---

## 🔗 Import Patterns

### Public Types (import from src/types/)

```typescript
// ✅ CORRECT
import type { Movie, TV, FeaturedMovie } from "@/types/movie";
import type { UseFetchState } from "@/types/hooks";
import type { ImageSize, ImageType } from "@/types/image";

// ✅ Also CORRECT (using barrel export)
import type { Movie, UseFetchState, ImageSize } from "@/types";
```

### Internal API Types (import from src/api/types/)

```typescript
// ✅ Only services should do this
import type { VideoResponse, ImageResponse } from "@/api/types";

// ❌ Components should NOT import these
import type { VideoResponse } from "@/api/types"; // BAD in components
```

### Services (import functions, not types)

```typescript
// ✅ CORRECT
import { getPopularMovies } from "@/services/movieService";
import { fetchFeaturedMovie } from "@/features/Featured/services/featuredService";

// ❌ WRONG
import type { Movie } from "@/services/movieService"; // BAD
// Use src/types/movie.ts instead
```

### Constants

```typescript
// ✅ CORRECT
import { IMAGE_SIZES } from "@/types/image";
import { ENV } from "@/config/env";

const size = IMAGE_SIZES.large; // "w780"
```

---

## 🚀 How to Extend

### Adding a New Domain Type

```typescript
// 1. Create in src/types/your-feature.ts
export interface YourFeature {
  id: number;
  name: string;
  description: string;
}

// 2. Export in src/types/index.ts
export type { YourFeature } from "./your-feature";

// 3. Use in services/components
import type { YourFeature } from "@/types";

const data: YourFeature = { id: 1, name: "...", description: "..." };
```

### Adding a New Service

```typescript
// 1. Create src/services/yourService.ts
import { tmdbClient } from "@/api/tmdbClient";
import type { YourAPIResponse } from "@/api/types"; // Internal API type
import type { YourFeature } from "@/types"; // Public domain type

// 2. Transform API response to domain type
const transformToYourFeature = (apiResponse: YourAPIResponse): YourFeature => {
  return {
    id: apiResponse.id,
    name: apiResponse.title,
    description: apiResponse.overview,
  };
};

// 3. Export public function
export const getYourFeature = async (id: number): Promise<YourFeature> => {
  const response = await tmdbClient<YourAPIResponse>(`/your/endpoint/${id}`, {
    params: { language: "en-US" },
  });
  return transformToYourFeature(response);
};

// 4. Use in components
import { getYourFeature } from "@/services/yourService";
import { useFetch } from "@/hooks/useFetch";

const Component = () => {
  const { data, loading } = useFetch(() => getYourFeature(123));
  // data is typed as YourFeature | null
};
```

### Adding a New Component

```typescript
// 1. Create in src/components/YourComponent.tsx
import type { YourFeature } from "@/types";

interface YourComponentProps {
  data: YourFeature;
  onAction?: () => void;
}

export const YourComponent = ({ data, onAction }: YourComponentProps) => {
  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      {onAction && <button onClick={onAction}>Action</button>}
    </div>
  );
};

// 2. Use in page
import { YourComponent } from "@/components/YourComponent";
import type { YourFeature } from "@/types";

export const YourPage = () => {
  const feature: YourFeature = { id: 1, name: "...", description: "..." };
  return <YourComponent data={feature} />;
};
```

---

## 📊 Current Architecture Status

### Files Created

- ✅ `src/api/types.ts` - HTTP client & API response types
- ✅ `src/types/featured.ts` - FeaturedMovie domain type
- ✅ `src/types/image.ts` - ImageSize, ImageType utilities
- ✅ `src/types/hooks.ts` - UseFetchState generic type
- ✅ `src/types/index.ts` - Barrel export for all types

### Files Updated

- ✅ `src/api/tmdbClient.ts` - Imports from api/types.ts
- ✅ `src/features/Featured/services/featuredService.ts` - Proper type imports
- ✅ `src/hooks/useFetch.ts` - Imports from types/hooks.ts
- ✅ `src/utils/image.ts` - Imports from types/image.ts

### Architecture Complete

- ✅ Type centralization
- ✅ API layer separation
- ✅ Service layer abstraction
- ✅ Clear data flow
- ✅ Consistent import patterns
- ✅ Ready for scaling

---

## 🎓 Architecture Summary

```
CLEAN ARCHITECTURE
├── UI Layer        (Components see only domain types)
├── Hook Layer      (Manages state, calls services)
├── Service Layer   (Transforms API → Domain)
├── API Layer       (HTTP requests, internal types)
└── Config Layer    (Environment variables)

KEY PRINCIPLE: Each layer depends only on types/contracts,
              not on implementation details
```

**No breaking changes.** All public APIs remain compatible. Production-ready! 🚀
