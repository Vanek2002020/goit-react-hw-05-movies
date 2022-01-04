import axios from "axios";
import { API_KEY, BASE } from "services/api";

import { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import Searchbar from "components/Searchbar/Searchbar";
import List from "components/List/List";
import Loading from "components/Loader/Loader";
import Button from "components/Button/Button";
import Container from "components/Container/Container";

import s from "views/MovieSearchView.module.css";

export default function MovieSearchView({
  onSetMovies,
  onSetQuery,
  onSetTotal,
  onSetPage,
  foundMovies,
  query,
  pageNumber,
  total,
}) {
  // const [query, setQuery] = useState('');

  const [error, setError] = useState(null);
  // const [total, setTotal] = useState(0);
  // const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (query === "") {
      return;
    }
    setLoading(true);

    onSetQuery(query);
    axios
      .get(
        `${BASE}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${pageNumber}&include_adult=false`
      )
      .then((response) => {
        const array = response.data.results;
        const total = response.data.total_results;
        onSetMovies(array);
        onSetTotal(total);
        // console.log(response);
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
    // console.log(foundMovies);
  }, [pageNumber, query]);

  const onQueryChange = (query) => {
    onSetQuery(query);
    onSetPage(1);
    onSetMovies([]);
    setError(null);
  };

  const loadMore = () => {
    onSetPage((prevPage) => prevPage + 1);
  };

  return (
    <Container>
      <Searchbar onSubmit={onQueryChange} />
      {loading && <Loading />}

      {foundMovies.length > 0 && (
        <>
          <h2>Results on {`"${query}"`}</h2>
          <List>
            {foundMovies.map(
              ({ title, id, poster_path, release_date, overview }) => (
                <li key={id} className={s.Search__item}>
                  <img
                    alt={title}
                    src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                    className={s.Search__image}
                  />
                  <div className={s.Search__description}>
                    <Link
                      to={`/movies/${id}`}
                      state={{ from: location }}
                      className={s.Search__title}
                    >
                      <h2>{title}</h2>
                    </Link>
                    <p> {new Date(release_date).toDateString()}</p>
                    <p className={s.Search__overview}>{overview}</p>
                  </div>
                </li>
              )
            )}
          </List>
        </>
      )}
      {total > 20 && <Button text="Load More" onClick={loadMore} />}
      {foundMovies.length === 0 && query && (
        <div>Nothing was found on {query}</div>
      )}
    </Container>
  );
}
