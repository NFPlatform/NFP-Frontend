import React from 'react';
import communityBackgroundImage from '../assets/img/communityBackground.png';
import moveVoteBtn from '../assets/img/btn_move_vote.png';
import moveDaoBtn from '../assets/img/btn_move_dao.png';
import { Box, Stack } from '@mui/material';
import { useHistory } from 'react-router-dom';

const CommunityPage = () => {
  const history = useHistory();
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <img
        src={communityBackgroundImage}
        alt="communityBackgroundImage"
        style={{ objectFit: 'contain', minWidth: 700, maxWidth: 1280 }}
      />
      <Stack
        direction={'row'}
        spacing={30}
        style={{ position: 'absolute', top: '90%' }}
      >
        <img
          src={moveVoteBtn}
          alt="moveVoteBtn"
          style={{
            objectFit: 'contain',
            minWidth: 100,
            maxWidth: 200,
            cursor: 'pointer',
          }}
          onClick={() => {
            history.push('/main/community/rank');
          }}
        />
        <img
          src={moveDaoBtn}
          alt="moveDaoBtn"
          style={{
            objectFit: 'contain',
            minWidth: 100,
            maxWidth: 200,
            cursor: 'pointer',
          }}
          onClick={() => {
            history.push('/main/community/opinion');
          }}
        />
      </Stack>
    </Box>
  );
};

export default CommunityPage;
