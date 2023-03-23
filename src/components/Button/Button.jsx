import PropTypes from 'prop-types';
import React from "react";
import css from "./Button.module.css";

const Button = ({nextPage, children}) => {
    return(
        <div className={css.buttonWrapper}>
            <button type='button' onClick={nextPage} className={css.button}>{children}</button>
        </div>
    )
}

export default Button;

Button.propTypes = {
    onClick: PropTypes.func,
  };