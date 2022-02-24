import React from 'react';
import { Box } from '@mui/material';
import giveOpinionBanner from '../assets/img/giveOpinionBanner.png';
import giveOpinionContent from '../assets/img/giveOpinionContent.png';

const GiveOpinionPage = () => {
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 10,
        }}
      >
        <img
          src={giveOpinionBanner}
          alt="giveOpinionBanner"
          style={{ objectFit: 'contain', marginBottom: 80, maxWidth: '100%' }}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img
            src={giveOpinionContent}
            alt="giveOpinionContent"
            style={{
              objectFit: 'cover',
              minWidth: 770,
              maxWidth: 770,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default GiveOpinionPage;
