import PropTypes from 'prop-types';
import css from './ImageGallerry.module.css'
import React from "react";
import ImageGalleryItem from '../ImageGalleryItem'; 

const ImageGallery = ({imagesData}) => {
    return( 
        <section className={css.gallerySection}>
            <ul className={css.gallery}>
                    {    imagesData ? 
                   imagesData.map( image => 
                        <ImageGalleryItem key={image.id} webPreviewImg={image.webformatURL} largeImageURL={image.largeImageURL} tags={image.tags}/>
                        )
                    : `empty data`}            
            </ul>  
        </section>       
    )
}

export default ImageGallery;

ImageGallery.propTypes ={
    imagesData: PropTypes.array.isRequired,
}