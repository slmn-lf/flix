# Hero Component

Hero section untuk menampilkan featured movie dengan trailer dan backdrop image.

## Komponen

### FeaturedHero.tsx

Component utama yang mengelola state featured content dan orchestration.

**Fitur:**

- Fetch featured movie data dari API
- Manage state: loading, error, featured data
- Switch antara banner (backdrop) dan trailer mode
- Render sub-components (HeroMedia, HeroGradient, HeroContent)

**State Management:**

```tsx
const [featured, setFeatured] = useState<FeaturedMovie | null>(null);
const [mode, setMode] = useState<"banner" | "trailer">("banner");
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
```

### HeroMedia.tsx

Component untuk menampilkan video trailer atau backdrop image.

**Props:**

- `backdropUrl`: Poster/backdrop image URL
- `trailerUrl`: YouTube embed URL untuk trailer
- `mode`: "banner" (image) atau "trailer" (video)
- `onTrailerEnd`: Callback ketika trailer selesai/di-scroll

**Fitur:**

- Autoplay video dengan mute (kebijakan browser)
- Auto unmute setelah 2 detik
- Auto stop setelah 40 detik (switch ke banner)
- Pause otomatis saat di-scroll (Intersection Observer)
- Scale 150% untuk fullscreen effect

### HeroGradient.tsx

Gradient overlay untuk meningkatkan readability text di atas hero background.

### HeroContent.tsx

Menampilkan title, overview, dan logo featured movie.

## Data Flow

```
FeaturedHero (fetch data)
    ↓
featured & mode state
    ↓
HeroMedia + HeroGradient + HeroContent
    ↓
Display dengan conditional rendering (loading/error/content)
```

## Fetch Service

### featuredService.ts

Service untuk fetch featured movie data dari TMDB API.

**Functions:**

1. **getFeaturedMovie()**
   - Ambil featured/trending movie
   - Call `getTrailerUrl()` untuk ambil trailer
   - Call `getLogoUrl()` untuk ambil logo
   - Return object dengan semua data yang diperlukan

2. **getTrailerUrl(movieId)**
   - Query video API dengan filter: YouTube, Trailer, Official
   - Format: `https://www.youtube.com/embed/{key}`
   - Return object: `{ url, key }`

3. **getLogoUrl(movieId)**
   - Query image API untuk logo
   - Pilih logo dengan vote_average tertinggi
   - Return image URL atau null

4. **buildImageUrl(path, size)**
   - Helper untuk format TMDB image URL
   - Default size: "original"
   - Return full image URL

## Type Definition

```tsx
interface FeaturedMovie {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string | null;
  posterUrl: string | null;
  logoUrl: string | null;
  trailerUrl: string | null;
  trailerKey: string | null;
}
```

## Alur Lengkap

1. **Mount FeaturedHero** → Set loading=true
2. **useEffect trigger** → Call `getFeaturedMovie()`
3. **Service fetch data:**
   - Get trending movie
   - Get trailer dari movieId
   - Get logo dari movieId
4. **Build response** → Set featured state + setLoading(false)
5. **Render** → HeroMedia (mode=banner) + HeroGradient + HeroContent
6. **User interaction** → (Optional) Bisa trigger trailer mode → HeroMedia switch ke video
7. **Auto actions:**
   - Video autoplay → Unmute 2s → Stop 40s
   - Scroll → Pause otomatis

## Error Handling

Jika fetch gagal:

- Catch error di try-catch
- Log error ke console
- Set featured dengan mockFeatured data (fallback)
- Tampilkan error message ke user

## Environment Variables

Diperlukan di `.env`:

```
VITE_TMDB_API_KEY=your_api_key
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
```
