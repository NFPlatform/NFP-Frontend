import React from 'react';
import artistRankPageImage from '../assets/img/artistRankPage.png';
import { Box } from '@mui/material';

const ArtistRankPage = () => {
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
        src={artistRankPageImage}
        alt="artistRankPageImage"
        style={{ objectFit: 'contain', minWidth: 700, maxWidth: 1286 }}
      />
    </Box>
  );
};

export default ArtistRankPage;
