'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Circular from '../components/Circular';
import AdCard from '../components/AdCard';
import Filter from '../components/Filter';

import styles from './index.module.scss';

const fetchAds = async (queryParams) => {
  const config = {
    params: queryParams || {},
  };

  try {
    const response = await axios.get('/api/ads', config);
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

const Index = () => {
  const [adData, setAdData] = useState(null);
  const [queryParams, setQueryParams] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAds(queryParams);

      if (data?.results.length !== 0) {
        setAdData(data?.results);
      } else {
        toast.info('No products found matching your filters', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce,
        });
      }
    };

    fetchData();
  }, [queryParams]);

  const adsList = adData?.map((elem) => (
    <AdCard
      key={elem.id}
      thumbnail={elem.images[0].thumbnail}
      title={elem.title}
      city={elem.city_name}
      price={elem.price}
      id={elem.id}
    />
  ));

  return (
    <div className={styles.container}>
      <div className={styles.page_wrapper}>
        <div className={styles.page_header}>
          <h1 className={styles.page_title}>List of ads</h1>
          <Filter submitQueryParams={setQueryParams} />
        </div>
        <div className={styles.ads_list}>{adData ? adsList : <Circular />}</div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Index;
