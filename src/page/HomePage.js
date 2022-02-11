import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import mainLeftImg from '../assets/img/home-main-left.png';
import mainRightImg1 from '../assets/img/home-main-right1.png';
import mainRightImg2 from '../assets/img/home-main-right2.jpeg';
import mainRightImg3 from '../assets/img/home-main-right3.jpeg';
import mainRightImg4 from '../assets/img/home-main-right4.png';
import mainRightImg5 from '../assets/img/home-main-right5.jpeg';
import mainRightImg6 from '../assets/img/home-main-right6.png';
import PieceCard from '../component/PieceCard';

const images = [
  {
    url: `${mainLeftImg}`,
    title: '지금 가장 HOT한 아티스트',
    width: '40%',
  },
  {
    url: `${mainRightImg1}`,
    title: '미술',
    width: '30%',
  },
  {
    url: `${mainRightImg2}`,
    title: '음악',
    width: '30%',
  },
  {
    url: `${mainRightImg3}`,
    title: '패션',
    width: '30%',
  },
  {
    url: `${mainRightImg4}`,
    title: '건축',
    width: '30%',
  },
  {
    url: `${mainRightImg5}`,
    title: '영화',
    width: '30%',
  },
  {
    url: `${mainRightImg6}`,
    title: '이벤트',
    width: '30%',
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  top: 0,
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.grey['700'],
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const HomePage = () => {
  return (
    <>
      <PieceCard />;
      <Box
        sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}
      >
        {images.map((image) => (
          <ImageButton
            focusRipple
            key={image.title}
            style={{
              width: image.width,
            }}
          >
            <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
            <ImageBackdrop className="MuiImageBackdrop-root" />
            <Typography
              component="span"
              variant="h6"
              color="white"
              sx={{
                position: 'absolute',
                top: 15,
                left: 15,
              }}
            >
              {image.title}
            </Typography>
          </ImageButton>
        ))}
      </Box>
    </>
  );
};

export default HomePage;
