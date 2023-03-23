import React from "react";
import { Component } from "react";
import PropTypes from 'prop-types';

import css from "./ImageGallerryItem.module.css";
import Modal from "../Modal";

class ImageGalleryItem extends Component{
    state={
        isModalActive: false,
    }

    onOpenModal = () => {
        this.setState({isModalActive: !this.state.isModalActive})
    }

    onCloseModal = () => {
        this.setState({isModalActive: false})
    }

    render(){
        return(   
            <li className={css.galleryItem}
                key={this.props.id} 
                onClick={this.onOpenModal}>
                    <img className={css.imgItem} 
                         src={this.props.webPreviewImg} 
                         alt={this.props.tags}
                        />
                {this.state.isModalActive && (
                <Modal onClose={this.onCloseModal}>
                    <img src={this.props.largeImageURL} 
                         alt={this.props.tags}
                        />
                </Modal>)}
            </li>
        )
    }
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes ={
    isModalActive: PropTypes.bool,
    webPreviewImg: PropTypes.string.isRequired,
    tags: PropTypes.string,
    id: PropTypes.string,
    largeImageURL: PropTypes.string.isRequired,
}