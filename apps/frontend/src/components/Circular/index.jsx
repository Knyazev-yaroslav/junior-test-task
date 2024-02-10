'use client';

import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import styles from './index.module.scss';

const Circular = () => (
  <div className={styles.circular}>
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  </div>
);

export default Circular;
