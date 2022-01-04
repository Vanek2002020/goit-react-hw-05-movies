import s from "components/Button/Button.module.css";

import PropTypes from "prop-types";

export default function Button({ type, text, onClick, children }) {
  return (
    <button className={s.Button} type={type} onClick={onClick}>
      {text} {children}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.any,
};
