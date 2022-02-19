import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import mainLeftImg from '../assets/img/home-main-left.png';
import mainRightImg6 from '../assets/img/home-main-right6.png';
import AuctionCard from '../component/AuctionCard';
import categoryList from '../lib/category';
import ArtistImg06 from '../assets/img/artistImg06.png';

import { Avatar, Container, Grid, Stack } from '@mui/material';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  getHotArtistThunk,
  getTopCollectorListThunk,
} from '../features/main/MainThunks';

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
  const dispatch = useDispatch();
  const topCollectorList = useSelector((state) => state.main.topCollectorList);
  const hotArtist = useSelector((state) => state.main.hotArtist);
  const auctionList = useSelector((state) => state.auction.auctionList);

  useEffect(async () => {
    await dispatch(getTopCollectorListThunk());
  }, []);

  useEffect(async () => {
    await dispatch(getHotArtistThunk());
  }, []);

  return (
    <Container>
      <Box sx={{ display: 'flex', minWidth: 300, paddingBottom: 7 }}>
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
          <Typography
            component="span"
            variant="h6"
            color="white"
            sx={{
              position: 'absolute',
              top: 45,
              left: 15,
            }}
          >
            {hotArtist.name}
          </Typography>
        </ImageButton>
        <div style={{ flex: 3, height: '600px' }}>
          <Grid columns={{ md: 6 }} container rowSpacing={2}>
            {categoryList.map((category, i) => (
              <Grid key={i} item md={2}>
                <ImageButton
                  focusRipple
                  height={'292px'}
                  onClick={() => {
                    history.push(`/main/piece?category=${category.key}`);
                  }}
                >
                  <ImageSrc
                    style={{ backgroundImage: `url(${category.img})` }}
                  />
                  <ImageBackdrop className="MuiImageBackdrop-root" />
                  <Typography
                    color="white"
                    component="span"
                    sx={{
                      position: 'absolute',
                      top: 15,
                      left: 15,
                    }}
                    variant="h6"
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
      <Stack sx={{ minWidth: 300, paddingBottom: 7 }}>
        <Box component="div" mb={3}>
          <Typography
            component="div"
            style={{ fontFamily: 'Noto Sans KR' }}
            letterSpacing={-1}
            fontSize={28}
          >
            내가 바로{' '}
            <Typography
              component="span"
              sx={{ fontWeight: 'bold', fontFamily: 'Noto Sans KR' }}
              letterSpacing={-1}
              fontSize={28}
            >
              TOP 콜렉터
            </Typography>
          </Typography>
        </Box>
        <Grid
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          container={true}
          rowSpacing={2.5}
          columns={10}
        >
          {topCollectorList.map((value, i) => (
            <Grid
              key={i}
              container={true}
              direction="row"
              item={true}
              xs={4}
              md={2}
            >
              <Stack
                direction="row"
                spacing={1.5}
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <Box width={'17px'} textAlign={'center'}>
                  <Typography
                    variant={'body2'}
                    component={'span'}
                    letterSpacing={-2}
                    fontWeight={'bold'}
                  >
                    {i + 1}
                  </Typography>
                </Box>
                <Avatar alt="Remy Sharp" src={ArtistImg06} />
                <Stack direction="column">
                  <Typography
                    component="div"
                    letterSpacing={-0.7}
                    lineHeight={'135%'}
                  >
                    {value.name}
                  </Typography>
                  <Typography
                    component="div"
                    letterSpacing={-0.7}
                    lineHeight={'135%'}
                    fontWeight={'bold'}
                    color={'primary'}
                  >
                    KLAY {value.klay}
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Stack>
      <Stack sx={{ minWidth: 300, paddingBottom: 15 }}>
        <Box component="div" mb={3}>
          <Typography
            component="div"
            style={{ fontFamily: 'Noto Sans KR' }}
            letterSpacing={-1}
            fontSize={28}
          >
            실시간{' '}
            <Typography
              component="span"
              sx={{ fontWeight: 'bold', fontFamily: 'Noto Sans KR' }}
              letterSpacing={-1}
              fontSize={28}
            >
              HOT한 작품들!
            </Typography>
          </Typography>
        </Box>
        <Grid
          container
          spacing={{ xs: 2, md: 2 }}
          columns={{ xs: 6, sm: 12, md: 18 }}
        >
          {auctionList.map((value, i) => (
            <Grid item xs={2} sm={3} md={3} key={i}>
              <AuctionCard
                auctionId={value.auctionId}
                auctionTokenId={value.auctionTokenId}
                klay={value.klay}
                vote={value.vote}
                sellerId={value.sellerId}
                sellerName={value.sellerName}
              />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Container>
  );
};

export default HomePage;
