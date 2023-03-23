import PropTypes from 'prop-types';
import React, { Component } from "react";
import css from "./Search.module.css";
import { toast } from 'react-toastify';
import { ReactComponent as LoupeIcon } from "../../icons/magnifying-glass-icon.svg";

class Searchbar extends Component {
    state = {
        queryData: "",
    }
    handleChange = (event) => {
        this.setState({queryData: event.target.value.toLowerCase()})
    }
    getQuery = (event) => {
        event.preventDefault();
        if(this.state.queryData.trim() === ""){
            toast.info("Just take me a query!");
            return;
        }
        this.props.onSubmitProps(this.state.queryData);        
    }
    render(){
        return(
            <header className={css.searchbar}>
                <form className={css.form} onSubmit={this.getQuery}>
                        <button type="submit" className={css.button}>
                            <LoupeIcon width="15" height="15"/>
                        </button>
                        <input
                            className={css.input}
                            name='imageRequest'
                            onChange={this.handleChange}
                            type="text"
                            autoComplete="off"
                            autoFocus
                            placeholder="Search images and photos"
                        />
                </form>
            </header>
    )
  }
}

export default Searchbar;

Searchbar.propTypes ={
    onSubmit: PropTypes.func,
}