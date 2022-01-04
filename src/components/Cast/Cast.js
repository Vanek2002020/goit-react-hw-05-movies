import defaultProfile from "images/default-profile.jpg";

import List from "components/List/List";

import s from "components/Cast/Cast.module.css";

import PropTypes from "prop-types";

export default function Cast({ castArray }) {
  return (
    <>
      <List additionalClass={s.Cast__list}>
        {castArray.length > 0 ? (
          castArray.map(({ name, profile_path, id, character }) => (
            <div key={id}>
              <li className={s.Cast__item}>
                {profile_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${profile_path}`}
                    alt={name}
                    width="200"
                  />
                ) : (
                  <div className={s.Cast__image}>
                    <img src={defaultProfile} alt={name} width="200" />
                  </div>
                )}

                <div className={s.Cast__description}>
                  <p>{name}</p>
                  <p>as</p>
                  <p>{character}</p>
                </div>
              </li>
            </div>
          ))
        ) : (
          <h2>No details on the cast</h2>
        )}
      </List>
    </>
  );
}

Cast.propTypes = {
  castArray: PropTypes.array,
};
