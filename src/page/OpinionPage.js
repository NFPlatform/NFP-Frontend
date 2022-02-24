import React from 'react';
import { Box } from '@mui/material';
import opinionBannerImg from '../assets/img/opinionBannerImg.png';
import opinionBtn from '../assets/img/opinionBtn.png';
import opinionCard from '../assets/img/opinionCard.png';
import { useHistory } from 'react-router-dom';

const OpinionPage = () => {
  const history = useHistory();
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
          src={opinionBannerImg}
          alt="opinionBannerImg"
          style={{ objectFit: 'contain', marginBottom: 40, maxWidth: '100%' }}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mx: 30,
          }}
        >
          <img
            src={opinionBtn}
            alt="opinionBtn"
            style={{
              objectFit: 'cover',
              marginLeft: 'auto',
              cursor: 'pointer',
              marginBottom: 10,
            }}
            onClick={() => history.push('/main/community/opinion/give')}
          />
          <img
            src={opinionCard}
            alt="opinionCard"
            style={{
              objectFit: 'cover',
              height: '100%',
              width: '100%',
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default OpinionPage;
