import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ReactComponent as LikeIcon } from '../../assets/like.svg';
import { ReactComponent as CloseIcon } from '../../assets/close.svg';

import styles from './index.module.scss';
import Circular from '../Circular';

const fetchAdDetails = async (id) => {
  try {
    const response = await axios.get(`/api/ads/${id}`);
    return response.data;
  } catch (error) {
    toast.warn(
      'Error when receiving data from the server, try refreshing the page',
      {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      }
    );
    return null;
  }
};

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

const AdDetails = ({ onClose, id }) => {
  const [adData, setAdData] = useState(null);
  const [adImages, setAdImages] = useState(null);
  const [isAdLiked, setIsAdLiked] = useState(false);

  useEffect(() => {
    setIsAdLiked(!!localStorage.getItem(id));

    const fetchData = async () => {
      const data = await fetchAdDetails(id);
      setAdData(data);
      const images = data?.images.map((elem) => elem.image);
      setAdImages(images);
    };

    fetchData();
  }, [id]);

  const handleLike = () => {
    localStorage.setItem(id, 'liked');
    setIsAdLiked(true);
  };
  const handleDislike = () => {
    localStorage.removeItem(id);
    setIsAdLiked(false);
  };
  const likeButtonHandler = isAdLiked ? handleDislike : handleLike;

  return (
    <div className={styles.details_container}>
      {adData ? (
        <div className={styles.modal}>
          <div className={styles.modal_content}>
            <Carousel images={adImages} />
            <div className={styles.ad_body}>
              <div className={styles.ad_top}>
                <h2 className={styles.ad_title}>{adData.title}</h2>
                <button
                  className={styles.like_button}
                  onClick={likeButtonHandler}
                  type="button"
                >
                  <LikeIcon
                    className={
                      isAdLiked ? styles.liked_icon : styles.not_liked_icon
                    }
                  />
                </button>
              </div>
              <div className={styles.ad_bottom}>
                <p className={styles.ad_city}>
                  {`${adData.city_name}, ${adData.disctrict_name}`}
                </p>
                <p className={styles.ad_price}>THB {adData.price}</p>
              </div>
              <div>
                <p className={styles.ad_city}>{adData.description}</p>
              </div>
            </div>
            <ToastContainer />
          </div>
          <button
            className={styles.close_button}
            onClick={onClose}
            type="button"
          >
            <CloseIcon className={styles.close_icon} />
          </button>
        </div>
      ) : (
        <Circular />
      )}
    </div>
  );
};

export default AdDetails;
