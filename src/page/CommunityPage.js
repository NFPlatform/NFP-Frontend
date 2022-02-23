import React from 'react';
import communityBackgroundImage from '../assets/img/communityBackground.png';
import { Box } from '@mui/material';

const CommunityPage = () => {
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <img
        src={communityBackgroundImage}
        alt="communityBackgroundImage"
        style={{ objectFit: 'contain', minWidth: 700, maxWidth: 1280 }}
      />
    </Box>
  );
};

export default CommunityPage;
