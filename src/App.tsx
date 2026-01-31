import { Route, Routes } from "react-router";
import "./App.css";
import Navbar from "./components/layout/Navbar/Navbar";
import MainLayout from "./layouts/MainLayout";
import LatestPage from "./pages/LatestPage";
import ListPage from "./pages/ListPage";
import MoviesPage from "./pages/MoviesPage";
import NotFoundPage from "./pages/NotFoundPage";
import SeriesPage from "./pages/SeriesPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <Navbar />
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/series" element={<SeriesPage />} />
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
