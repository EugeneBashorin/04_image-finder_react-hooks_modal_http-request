import PropTypes from 'prop-types';
import React, { useState } from "react";
import css from "./Search.module.css";
import { toast } from 'react-toastify';
import { ReactComponent as LoupeIcon } from "../../icons/magnifying-glass-icon.svg";

const Searchbar = ({onSubmitProps}) => {
    const[queryData, setQueryData] = useState("");
    const handleChange = (event) => {
        setQueryData(event.target.value.toLowerCase())
    }
    const getQuery = (event) => {
        event.preventDefault();
        if(queryData.trim() === ""){
            toast.info("Just take me a query!");
            return;
        }
        onSubmitProps(queryData);       
    }
        return(
            <header className={css.searchbar}>
                <form className={css.form} onSubmit={getQuery}>
                        <button type="submit" className={css.button}>
                            <LoupeIcon width="15" height="15"/>
                        </button>
                        <input
                            className={css.input}
                            name='imageRequest'
                            onChange={handleChange}
                            type="text"
                            autoComplete="off"
                            autoFocus
                            placeholder="Search images and photos"
                        />
                </form>
            </header>
    )
}

export default Searchbar;

Searchbar.propTypes ={
    onSubmit: PropTypes.func,
}