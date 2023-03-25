import PropTypes from 'prop-types';
import React from "react";
import css from "./MessageBlock.module.css";

export const MessageBlock = ({children}) => {
    return(
        <h3 className={css.messageBlock}>{children}</h3>
    )
}

MessageBlock.propTypes = {
    children: PropTypes.string,
  };