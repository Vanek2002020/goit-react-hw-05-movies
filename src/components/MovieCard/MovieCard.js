import s from "components/MovieCard/MovieCard.module.css";
import axios from "axios";
import { useState, useEffect, lazy } from "react";
import { BASE, API_KEY } from "services/api";

import PropTypes from "prop-types";
import Loading from "components/Loader/Loader";

const AddInfo = lazy(() =>
  import("components/AddInfo/AddInfo" /*webpackChunkName: "add-info" */)
);

export default function MovieCard({ id }) {
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState({ budget: 0, runtime: 0 });

  const {
    vote_average,
    title,
    poster_path,
    overview,
    release_date,
    genres = [],
  } = movie;

  // console.log(genres);
  // console.log(date);
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${BASE}/movie/${id}?api_key=${API_KEY}&language=en-US
`
      )
      .then((response) => {
        setMovie(response.data);
        // console.log(response.data);
        // console.log(movie);
      })
      .finally(() => setLoading(false));
  }, [id]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <article className={s.MovieCard}>
            <div className={s.Card__poster}>
              <img
                className={s.Card__image}
                alt={title}
                src={`https://image.tmdb.org/t/p/w300/${poster_path}`}
              />
            </div>
            <div className={s.Card__subcontainer}>
              <h2>{`${title} (${release_date})`}</h2>

              <p className={s.Card__genres}>
                {genres.map(({ name }) => name).join(", ")}
              </p>
              <p>Rating {vote_average > 0 && vote_average}</p>
              <p>{overview}</p>
            </div>
          </article>
          <AddInfo id={id} />
        </>
      )}
    </>
  );
}

MovieCard.propTypes = {
  title: PropTypes.string,
  score: PropTypes.number,
  poster: PropTypes.string,
  overview: PropTypes.string,
  genres: PropTypes.array,
  date: PropTypes.string,
};
