'use client';

import React, { useEffect, useState } from 'react';

import { ReactComponent as LikeIcon } from '../../assets/like.svg';

import styles from './index.module.scss';

const AdCard = ({ thumbnail, title, city, price, id }) => {
  const [isAdLiked, setIsAdLiked] = useState(false);

  useEffect(() => {
    setIsAdLiked(!!localStorage.getItem(id));
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
    <div className={styles.ad_card_container}>
      <img className={styles.thumbnail} src={thumbnail} alt="thumbnail img" />
      <div className={styles.ad_body}>
        <div className={styles.ad_top}>
          <h2 className={styles.ad_title}>{title}</h2>
          <button
            className={styles.like_button}
            onClick={likeButtonHandler}
            type="button"
          >
            <LikeIcon
              className={isAdLiked ? styles.liked_icon : styles.not_liked_icon}
            />
          </button>
        </div>
        <div className={styles.ad_bottom}>
          <p className={styles.ad_city}>{city}</p>
          <p className={styles.ad_price}>THB {price}</p>
        </div>
      </div>
    </div>
  );
};

export default AdCard;
