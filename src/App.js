import "./App.css";

import { Suspense, lazy, useState } from "react";
import { Routes, Route } from "react-router";

import Loading from "components/Loader/Loader";
import { Header } from "components/Header/Header";

const HomeView = lazy(() =>
  import("views/HomeView.js" /* webpackChunkName: "home-view" */)
);
const MovieSearchView = lazy(() =>
  import("views/MovieSearchView" /* webpackChunkName: "search-view" */)
);

const MovieDetailsView = lazy(() =>
  import("views/MovieDetailsView" /*webpackChunkName: "movie-view" */)
);

function App() {
  const [foundMovies, setFoundMovies] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [total, setTotal] = useState(0);
  const [query, setQuery] = useState("");

  const onSetMovies = (array) => {
    if (array.length === 0) {
      setFoundMovies([]);
    } else {
      setFoundMovies((prevList) => [...prevList, ...array]);
    }
  };

  const onSetQuery = (query) => {
    setQuery(query);
  };

  const onSetPage = (number) => {
    setPageNumber(number);
  };

  const onSetTotal = (total) => {
    setTotal(total);
  };

  return (
    <>
      <Header />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/*" element={<HomeView />} />
          <Route
            path="/movies"
            element={
              <MovieSearchView
                onSetMovies={onSetMovies}
                onSetQuery={onSetQuery}
                onSetPage={onSetPage}
                onSetTotal={onSetTotal}
                total={total}
                foundMovies={foundMovies}
                query={query}
                pageNumber={pageNumber}
              />
            }
          />

          <Route path="/movies/:id/*" element={<MovieDetailsView />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
