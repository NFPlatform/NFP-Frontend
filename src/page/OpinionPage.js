import React from 'react';
import daoPageImage from '../assets/img/daoPage.png';
import { Box } from '@mui/material';

const OpinionPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mb: 10,
      }}
    >
      <img
        src={daoPageImage}
        alt="daoPageImage"
        style={{ objectFit: 'contain', minWidth: 700, maxWidth: 1286 }}
      />
    </Box>
  );
};

export default OpinionPage;
