import { Suspense, lazy, useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router";
import { NavLink } from "react-router-dom";

import axios from "axios";
import { BASE, API_KEY } from "services/api";

import Container from "components/Container/Container";
import Loading from "components/Loader/Loader";

import s from "components/AddInfo/AddInfo.module.css";

import PropTypes from "prop-types";

const Cast = lazy(() =>
  import("components/Cast/Cast" /* webpackChunkName: "cast" */)
);
const Reviews = lazy(() =>
  import("components/Reviews/Reviews" /* webpackChunkName: "reviews" */)
);

export default function AddInfo({ id }) {
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);

  const [reviews, setReviews] = useState([]);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${BASE}/movie/${id}/reviews?api_key=${API_KEY}&language=en-US&page=1`
      )
      .then((response) => setReviews(response.data.results))
      .catch((error) => console.log(error.message))
      .finally(() => setLoading(false));
    // console.log(reviews);
  }, [id]);

  useEffect(() => {
    setLoading(true);

    axios
      .get(`${BASE}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`)
      .then((response) => setCast(response.data.cast))
      .catch((error) => console.log(error.message))
      .finally(() => setLoading(false));

    // console.log(cast);
  }, [id]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Container additionalClass={s.AddInfo__links}>
          <NavLink
            to={`cast`}
            className={s.AddInfo__item}
            replace
            state={{ from: state }}
          >
            Cast
          </NavLink>
          <NavLink
            to={`reviews`}
            className={s.AddInfo__item}
            replace
            state={{ from: state }}
          >
            Reviews
          </NavLink>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route
                path={`cast`}
                element={<Cast id={id} castArray={cast} additional />}
              />
              <Route
                path={`reviews`}
                element={<Reviews id={id} reviewsArray={reviews} />}
              />
            </Routes>
          </Suspense>
        </Container>
      )}
    </>
  );
}

AddInfo.propTypes = {
  id: PropTypes.string,
  reviews: PropTypes.array,
  cast: PropTypes.array,
};
