import React, { useState } from 'react';
import artistRankBannerImage from '../assets/img/artistRankPageBannerImg.png';
import artistRankCardImg from '../assets/img/artistRankPageCardImg.png';
import artistRankBtn from '../assets/img/artistRankBtn.png';
import { Box, Modal } from '@mui/material';
import artistModal from '../assets/img/artistModal.png';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 5,
  py: 2,
};

const ArtistRankPage = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
          src={artistRankBannerImage}
          alt="artistRankBannerImage"
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
            src={artistRankBtn}
            alt="artistRankBtn"
            style={{
              objectFit: 'cover',
              marginLeft: 'auto',
              cursor: 'pointer',
              marginBottom: 10,
            }}
            onClick={handleOpen}
          />
          <img
            src={artistRankCardImg}
            alt="artistRankCardImg"
            style={{
              objectFit: 'cover',
              height: '100%',
              width: '100%',
            }}
          />
        </Box>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img
            src={artistModal}
            alt="artistModal"
            style={{ objectFit: 'contain', minWidth: 450, maxWidth: 450 }}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default ArtistRankPage;
