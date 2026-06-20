import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router";
import "./App.css";
import Navbar from "./components/layout/Navbar/Navbar";
import ErrorBoundary from "./components/ErrorBoundary";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";

const LatestPage = lazy(() => import("./pages/LatestPage"));
const ListPage = lazy(() => import("./pages/ListPage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const SeriesPage = lazy(() => import("./pages/SeriesPage"));
const SeriesDetailPage = lazy(() => import("./pages/SeriesDetailPage"));
const DetailMoviePage = lazy(() => import("./pages/DetailMoviePage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));

const PageLoader = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="w-8 h-8 border-4 border-gray-800 border-t-transparent rounded-full animate-spin" />
  </div>
);

function App() {
  const location = useLocation();
  const isDetailPage = /^\/(movie|series)\/\d+$/.test(location.pathname);

  return (
    <>
      {!isDetailPage && <Navbar />}
      <MainLayout>
        <ErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/movies" element={<MoviesPage />} />
              <Route path="/movie/:movieId" element={<DetailMoviePage />} />
              <Route path="/series" element={<SeriesPage />} />
              <Route path="/series/:seriesId" element={<SeriesDetailPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/latest" element={<LatestPage />} />
              <Route path="/list" element={<ListPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </MainLayout>
    </>
  );
}

export default App;
