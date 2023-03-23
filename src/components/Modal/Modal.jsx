import React, { Component } from "react";
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';
import css from "./Modal.module.css";

const modalPlace = document.querySelector('#modal-root');

class Modal extends Component{

    componentDidMount(){
        window.addEventListener('keydown', this.handleKeyEscDown)
    }

    componentWillUnmount(){
        window.addEventListener('keydown', this.handleKeyEscDown)
    }

    handleKeyEscDown = evt => {
        if(evt.code === 'Escape'){
            this.props.onClose();
        }
    };

    handleBackdropClick = evt => {
        if(evt.currentTarget === evt.target){
            this.props.onClose();
        }
    };

    render(){
        return createPortal(
                <div className={css.modalBackdrop} onClick={this.handleBackdropClick}>
                    <div className={css.modalContentWrapper}>
                        {this.props.children}
                    </div>
                </div>, modalPlace
                );    
        }
}

export default Modal;

Modal.protoTypes = {
    onClick: PropTypes.func.isRequired,
}