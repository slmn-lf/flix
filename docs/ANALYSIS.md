# Flix — Codebase Analysis

_Generated: 2026-06-20_

---

## 🔴 Critical / Bug

| # | Issue | Lokasi |
|---|-------|--------|
| 1 | **`useFetch` hook tidak re-fetch saat dependencies berubah** — `useEffect` kedua punya `[]` dependency, jadi meski `dependencies` berubah, fetch tidak pernah diulang. | `src/hooks/useFetch.ts:37` |
| 2 | **Detail pages bypass service layer** — `DetailMoviePage.tsx` dan `SeriesDetailPage.tsx` panggil `tmdbClient` langsung, tidak melalui `movieService`/`tvService`. Melanggar layered architecture. | `src/pages/DetailMoviePage.tsx`, `SeriesDetailPage.tsx` |
| 3 | **TMDB Access Token terekspos di client bundle** — Token akan terlihat di Network tab browser karena dipakai langsung di `tmdbClient.ts` tanpa proxy backend. | `src/config/env.ts` + `src/api/tmdbClient.ts` |

---

## 🟡 Performa & Code Quality

| # | Issue | Detail |
|---|-------|--------|
| 4 | **No code splitting** — Semua page di-*eager import* di `App.tsx`, tidak ada `React.lazy()` + `Suspense`. | `src/App.tsx` |
| 5 | **Tidak ada memoization** — Tidak ada `React.memo`, `useMemo`, atau `useCallback` di komponen manapun. | Seluruh komponen |
| 6 | **Dead code** — 2 file kosong tidak dipakai. | `src/features/Featured/movie-card/styles/HoverAnimation.ts`, `movie-card/index.tsx` |
| 7 | **Unused props** — `MovieCard.tsx` mendefinisikan props `onHover`/`onLeave` tapi tidak digunakan di implementasi. | `src/features/Featured/movie-card/component/MovieCard.tsx` |
| 8 | **Duplikasi utilitas image** — `featuredService.ts` punya `buildImageUrl` sendiri, padahal sudah ada `getImageUrl` di `src/utils/image.ts`. | `src/features/Featured/services/featuredService.ts` |
| 9 | **Placeholder pages tidak perlu routing** — `LatestPage`, `ListPage`, `NotFoundPage` cuma `<div>text</div>`, lebih baik unified. | `src/pages/LatestPage.tsx`, `ListPage.tsx`, `NotFoundPage.tsx` |
| 10 | **Hardcoded magic numbers** — `totalPages` di-cap 500 tanpa alasan jelas. | `src/pages/MoviesPage.tsx:13`, `SeriesPage.tsx:13` |
| 11 | **Tidak ada Error Boundary** — Jika satu row gagal fetch, bisa berdampak ke komponen lain. | Seluruh app |
| 12 | **Loading state minim** — Cuma teks "Loading..." tanpa skeleton/shimmer. | Seluruh halaman |

---

## 🟢 Optimization & Development Opportunities

| Area | Saran |
|------|-------|
| **Pagination** | Ganti pagination dengan infinite scroll (IntersectionObserver) untuk UX lebih mulus. |
| **Search** | Tambah debounce + autocomplete suggestions saat user mengetik. |
| **Filter** | Tambah filter genre, tahun, rating di halaman Movies & Series. |
| **"My List"** | Fitur ini ada di navbar tapi belum diimplementasi — bisa pakai localStorage atau backend. |
| **Detail Page** | Tambah related/recommended content di bawah video player. |
| **Video Player** | Custom player dengan subtitle, quality selector, Picture-in-Picture. |
| **PWA** | Offline support lebih baik (cache pages, background sync). |
| **CI/CD** | Belum ada lint/build script di CI, juga belum ada test setup. |

---

## 🔧 Refactoring Priorities

1. **Fix `useFetch` hook** — Ubah dependency array agar proper re-fetch saat dependencies berubah.
2. **Buat `getMovieDetail(id)` & `getTVDetail(id)` di service layer** — Pindahkan logic dari pages ke service, jangan panggil `tmdbClient` langsung.
3. **Konsolidasi utility image** — Hapus `buildImageUrl` di `featuredService.ts`, pakai fungsi dari `src/utils/image.ts`.
4. **Bersihkan dead code** — Hapus 2 file kosong, hapus unused props.
5. **Gunakan `React.lazy`** untuk lazy loading pages.
6. **Tambah Error Boundary** di setiap segmen utama (hero, rows, detail pages).

---

## 📁 File Reference

| File | Baris | Masalah |
|------|-------|---------|
| `src/hooks/useFetch.ts` | 37 | `useEffect` dependency array kosong, tidak re-fetch |
| `src/pages/DetailMoviePage.tsx` | 23 | `tmdbClient` langsung, bypass service layer |
| `src/pages/SeriesDetailPage.tsx` | 24 | `tmdbClient` langsung, bypass service layer |
| `src/features/Featured/services/featuredService.ts` | 4 | Duplikasi `buildImageUrl` |
| `src/features/Featured/movie-card/styles/HoverAnimation.ts` | - | File kosong |
| `src/features/Featured/movie-card/index.tsx` | - | File kosong |
| `src/features/Featured/movie-card/component/MovieCard.tsx` | 3 | Props `onHover`/`onLeave` tidak terpakai |
| `src/pages/MoviesPage.tsx` | 13 | Hardcoded cap 500 totalPages |
| `src/pages/SeriesPage.tsx` | 13 | Hardcoded cap 500 totalPages |
