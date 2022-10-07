import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import React, { Component } from 'react';
import styles from './ImageGallery.module.css';
import {nanoid} from "nanoid";

const { gallery } = styles;

export class ImageGallery extends Component {
  render() {
    
    const {images, openModal} = this.props;
    return (
      <ul className={gallery}>
        {images.map(image => {
          return <ImageGalleryItem
          image={image}
          key={nanoid()}
          openModal={openModal}/>;
        })}
      </ul>
    );
  }
}

export default ImageGallery;
