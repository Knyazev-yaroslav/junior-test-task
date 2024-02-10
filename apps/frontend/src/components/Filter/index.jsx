'use client';

import React, { useRef, useEffect, useState } from 'react';

import styles from './index.module.scss';

const Filter = ({ submitQueryParams }) => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    minPrice: '',
    maxPrice: '',
    city: '',
    district: '',
    search: '',
  });
  const popupRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const myEvent = event;
      const path = myEvent.path || (event.composedPath && event.composedPath());
      if (popupRef.current && !path.includes(popupRef.current)) {
        setPopupOpen(false);
      }
    };

    document.body.addEventListener('click', handleOutsideClick);

    return () => {
      document.body.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredParams = Object.fromEntries(
      Object.entries(formData).filter(([key, value]) => value !== '')
    );

    submitQueryParams(filteredParams);
  };

  return (
    <div ref={popupRef}>
      <button
        className={popupOpen ? styles.popup_button_open : styles.popup_button}
        type="button"
        onClick={() => setPopupOpen(!popupOpen)}
      >
        Filters:
      </button>
      <div className={styles.popup}>
        {popupOpen && (
          <div className={styles.popup_menu}>
            <form className={styles.input_form} onSubmit={handleSubmit}>
              <label className={styles.label} htmlFor="minPrice">
                Min Price:
                <input
                  className={styles.input}
                  type="number"
                  id="minPrice"
                  name="minPrice"
                  value={formData.minPrice}
                  onChange={handleChange}
                />
              </label>
              <label className={styles.label} htmlFor="maxPrice">
                Max Price:
                <input
                  className={styles.input}
                  type="number"
                  id="maxPrice"
                  name="maxPrice"
                  value={formData.maxPrice}
                  onChange={handleChange}
                />
              </label>
              <label className={styles.label} htmlFor="city">
                City:
                <input
                  className={styles.input}
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </label>
              <label className={styles.label} htmlFor="district">
                District:
                <input
                  className={styles.input}
                  type="text"
                  id="district"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                />
              </label>
              <label className={styles.label} htmlFor="search">
                Contains:
                <input
                  className={styles.input}
                  type="text"
                  id="search"
                  name="search"
                  value={formData.search}
                  onChange={handleChange}
                />
              </label>
              <button className={styles.submit_filters} type="submit">
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;
