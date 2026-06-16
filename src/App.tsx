import { Route, Routes, useLocation } from "react-router";
import "./App.css";
import Navbar from "./components/layout/Navbar/Navbar";
import MainLayout from "./layouts/MainLayout";
import LatestPage from "./pages/LatestPage";
import ListPage from "./pages/ListPage";
import MoviesPage from "./pages/MoviesPage";
import NotFoundPage from "./pages/NotFoundPage";
import SeriesPage from "./pages/SeriesPage";
import SeriesDetailPage from "./pages/SeriesDetailPage";
import HomePage from "./pages/HomePage";
import DetailMoviePage from "./pages/DetailMoviePage";
import SearchPage from "./pages/SearchPage";

function App() {
  const location = useLocation();
  const isDetailPage = /^\/(movie|series)\/\d+$/.test(location.pathname);

  return (
    <>
      {!isDetailPage && <Navbar />}
      <MainLayout>
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
      </MainLayout>
    </>
  );
}

export default App;
// test code to call movie service
// import { useEffect } from "react";
// import { getPopularMovies } from "@/services/movie.service";

// function App() {
//   useEffect(() => {
//     getPopularMovies()
//       .then((movies) => {
//         console.log("Popular movies:", movies[0]);
//       })
//       .catch(console.error);
//   }, []);

//   return <div>Check console</div>;
// }

// export default App;
