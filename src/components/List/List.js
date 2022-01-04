import s from "components/List/List.module.css";

import PropTypes from "prop-types";

export default function List({
  children,
  heading,
  additionalClass,
  classProp,
}) {
  return (
    <>
      <h2 className={classProp}>{heading}</h2>
      <ul className={`${s.List}, ${additionalClass}`}>{children}</ul>
    </>
  );
}

List.propTypes = {
  children: PropTypes.any,
  heading: PropTypes.string,
  additionalClass: PropTypes.string,
  classProp: PropTypes.string,
};
