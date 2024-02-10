'use client';

import React, { useState } from 'react';

import styles from './index.module.scss';

const Carousel = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextSlide = () => {
    setCurrentImageIndex((currentImageIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentImageIndex(
      (currentImageIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className={styles.carousel_container}>
      <button className={styles.prev_button} type="button" onClick={prevSlide}>
        Previous
      </button>
      <img
        className={styles.carousel_img}
        key={currentImageIndex}
        src={images[currentImageIndex]}
        alt={currentImageIndex + 1}
      />
      <button className={styles.next_button} type="button" onClick={nextSlide}>
        Next
      </button>
    </div>
  );
};

export default Carousel;
