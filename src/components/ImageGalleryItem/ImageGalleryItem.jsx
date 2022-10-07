import React, { Component } from 'react'
import styles from "./ImageGalleryItem.module.css"

const {gallery_item, gallery_img} = styles;

export class ImageGalleryItem extends Component {

  render() {
    const {image, openModal} = this.props;
    const {webformatURL, tags, largeImageURL} = image;
    return (
        <li className={gallery_item}>
        <img src={webformatURL} alt={tags} className={gallery_img} onClick={() => openModal(largeImageURL, tags)}/>
        </li>
    )
  }
}

export default ImageGalleryItem