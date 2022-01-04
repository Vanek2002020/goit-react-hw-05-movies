import s from "components/Container/Container.module.css";

import PropTypes from "prop-types";

export default function Container({ children, additionalClass }) {
  return (
    <div className={`${additionalClass}, ${s.Container} `}>{children}</div>
  );
}

Container.propTypes = {
  children: PropTypes.any,
  additionalClass: PropTypes.string,
};
