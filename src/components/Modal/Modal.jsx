import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';
import css from "./Modal.module.css";

const modalPlace = document.querySelector('#modal-root');

const Modal = ({onClose, children}) => {
    //componentDidMount
    useEffect(()=>{
        window.addEventListener('keydown', handleKeyEscDown)
    },[])
    // componentWillUnmount
    useEffect(()=>{
        window.addEventListener('keydown', handleKeyEscDown);
        return () => {
            window.removeEventListener('keydown', handleKeyEscDown);
        }
    },[])

    const handleKeyEscDown = evt => {
        if(evt.code === 'Escape'){
            onClose();
        }
    };

    const handleBackdropClick = evt => {
        if(evt.currentTarget === evt.target){
            onClose();
        }
    };

    return createPortal(
        <div className={css.modalBackdrop} onClick={handleBackdropClick}>
            <div className={css.modalContentWrapper}>
                {children}
            </div>
        </div>, modalPlace
    );    
}

export default Modal;

Modal.protoTypes = {
    onClick: PropTypes.func.isRequired,
}