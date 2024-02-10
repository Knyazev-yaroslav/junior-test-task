'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
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
    console.error('Ошибка при получении данных:', error);
    return null;
  }
};

const Index = () => {
  const [adData, setAdData] = useState(null);
  const [queryParams, setQueryParams] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAds(queryParams);
      setAdData(data.results);
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
        <div className={styles.ads_list}> {adsList}</div>
      </div>
    </div>
  );
};

export default Index;
