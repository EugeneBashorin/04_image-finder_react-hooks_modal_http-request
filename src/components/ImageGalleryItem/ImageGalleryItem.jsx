import React from "react";
import {useState} from "react";
import PropTypes from 'prop-types';

import css from "./ImageGallerryItem.module.css";
import Modal from "../Modal";

const ImageGalleryItem = (imagesData) => {
    const[isModalActive, setIsModalActive]=useState(false);
    const onOpenModal = () => {
        setIsModalActive(!isModalActive)
    }
    const onCloseModal = () => {
        setIsModalActive(false);
    }
    return(  
        <li className={css.galleryItem}
            key={imagesData.id} 
            onClick={onOpenModal}>
            <img className={css.imgItem} 
                 src={imagesData.webPreviewImg} 
                 alt={imagesData.tags}
                    />
            {isModalActive && (
            <Modal onClose={onCloseModal}>
                <img src={imagesData.largeImageURL} 
                     alt={imagesData.tags}
                    />
            </Modal>)}
        </li>
    )
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes ={
    isModalActive: PropTypes.bool,
    webPreviewImg: PropTypes.string.isRequired,
    tags: PropTypes.string,
    id: PropTypes.string,
    largeImageURL: PropTypes.string.isRequired,
}