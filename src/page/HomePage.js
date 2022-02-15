import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import mainLeftImg from '../assets/img/home-main-left.png';
import mainRightImg6 from '../assets/img/home-main-right6.png';
import AuctionCard from '../component/AuctionCard';
import categoryList from '../lib/category';

import { Container, Grid } from '@mui/material';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

const ImageButton = styled(ButtonBase)(({ height, theme }) => ({
  position: 'relative',
  height: `${height}`,
  width: 'calc(100% - 40px)',
  margin: '0 20px',
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
  const history = useHistory();

  return (
    <Container>
      <Box sx={{ display: 'flex', minWidth: 300, paddingBottom: 5 }}>
        <ImageButton
          focusRipple
          style={{
            flex: 2,
          }}
          height={'600px'}
          onClick={() => {
            toast.success('지원하지 않는 기능입니다.');
          }}
        >
          <ImageSrc style={{ backgroundImage: `url(${mainLeftImg})` }} />
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
            지금 가장 HOT한 아티스트
          </Typography>
        </ImageButton>
        <div style={{ flex: 3, height: '600px' }}>
          <Grid container rowSpacing={2} columns={{ md: 6 }}>
            {categoryList.map((category, i) => (
              <Grid key={i} item md={2}>
                <ImageButton
                  height={'292px'}
                  focusRipple
                  onClick={() => {
                    history.push(`/main/piece?category=${category.key}`);
                  }}
                >
                  <ImageSrc
                    style={{ backgroundImage: `url(${category.img})` }}
                  />
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
                    {category.ko}
                  </Typography>
                </ImageButton>
              </Grid>
            ))}
            <Grid item md={2}>
              <ImageButton
                height={'292px'}
                focusRipple
                onClick={() => {
                  toast.success('지원하지 않는 기능입니다.');
                }}
              >
                <ImageSrc
                  style={{ backgroundImage: `url(${mainRightImg6})` }}
                />
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
                  이벤트
                </Typography>
              </ImageButton>
            </Grid>
          </Grid>
        </div>
      </Box>
      <Box sx={{ minWidth: 300, paddingBottom: 5 }}>
        <Typography>내가 바로 TOP 콜렉터</Typography>
      </Box>
      <Box>
        <AuctionCard />
      </Box>
    </Container>
  );
};

export default HomePage;
