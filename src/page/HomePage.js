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
import {
  getAuctionListThunk,
  getSortedAuctionListThunk,
} from '../features/auction/AuctionThunks';

const ImageButton = styled(ButtonBase)(({ height, theme }) => ({
  position: 'relative',
  height: `${height}`,
  width: 'calc(100%)',
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '& .MuiTouchRipple-root': {
    margin: '0 8px',
    borderRadius: 15,
  },
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
  borderRadius: 15,
  margin: '0 8px',
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
  borderRadius: 15,
  margin: '0 8px',
}));

const HomePage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const topCollectorList = useSelector((state) => state.main.topCollectorList);
  const hotArtist = useSelector((state) => state.main.hotArtist);
  const auctionList = useSelector((state) => state.auction.sortedAuctionList);

  useEffect(async () => {
    await dispatch(getTopCollectorListThunk());
  }, []);

  useEffect(async () => {
    await dispatch(getHotArtistThunk());
  }, []);

  useEffect(async () => {
    await dispatch(getSortedAuctionListThunk());
  }, []);

  return (
    <Container sx={{ marginTop: 3 }}>
      <Box sx={{ display: 'flex', minWidth: 300, paddingBottom: 5 }}>
        <ImageButton
          focusRipple
          style={{
            flex: 2,
          }}
          height={'465px'}
        >
          <ImageSrc style={{ backgroundImage: `url(${mainLeftImg})` }} />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Typography
            component="div"
            variant="h5"
            color="white"
            sx={{
              position: 'absolute',
              top: 20,
              left: 25,
            }}
            fontFamily={'Gmarket Sans'}
            fontWeight={700}
            letterSpacing={-1}
          >
            지금 가장 HOT한 아티스트
          </Typography>
          <Typography
            component="div"
            variant="h5"
            color="white"
            sx={{
              position: 'absolute',
              top: 55,
              left: 25,
            }}
            fontFamily={'Gmarket Sans'}
          >
            {hotArtist.name}
          </Typography>
        </ImageButton>
        <div style={{ flex: 3, height: '465px' }}>
          <Grid columns={{ md: 6 }} container rowSpacing={2}>
            {categoryList.map((category, i) => (
              <Grid key={i} item md={2}>
                <ImageButton
                  focusRipple
                  height={'225px'}
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
                      left: 25,
                    }}
                    variant="h5"
                    fontFamily={'Gmarket Sans'}
                  >
                    {category.ko}
                  </Typography>
                </ImageButton>
              </Grid>
            ))}
            <Grid item md={2}>
              <ImageButton
                height={'225px'}
                focusRipple
                onClick={() => {
                  toast.success('지원하지 않는 기능입니다.', {
                    toastId: 'main',
                  });
                }}
              >
                <ImageSrc
                  style={{ backgroundImage: `url(${mainRightImg6})` }}
                />
                <ImageBackdrop className="MuiImageBackdrop-root" />
                <Typography
                  component="span"
                  variant="h5"
                  color="white"
                  sx={{
                    position: 'absolute',
                    top: 15,
                    left: 25,
                  }}
                  fontFamily={'Gmarket Sans'}
                >
                  이벤트
                </Typography>
              </ImageButton>
            </Grid>
          </Grid>
        </div>
      </Box>
      <Stack sx={{ minWidth: 300, paddingBottom: 5 }}>
        <Box component="div" mb={2} letterSpacing={-1.5}>
          <Typography component="div" fontSize={28} fontFamily="Gmarket Sans">
            🏅 내가 바로{' '}
            <Typography
              component="span"
              sx={{ fontWeight: 700 }}
              fontSize={28}
              fontFamily="Gmarket Sans"
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
                <Avatar
                  alt={ArtistImg06}
                  src={`https://api.nfplatform.com/user/${value.id}/img`}
                />
                <Stack direction="column">
                  <Typography
                    component="div"
                    letterSpacing={-0.7}
                    lineHeight={'125%'}
                  >
                    {value.name}
                  </Typography>
                  <Typography
                    component="div"
                    letterSpacing={-1}
                    lineHeight={'125%'}
                    fontWeight={500}
                    fontSize={14}
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
        <Box component="div" mb={2} letterSpacing={-1.5}>
          <Typography component="div" fontSize={28} fontFamily={'Gmarket Sans'}>
            🔥 실시간{' '}
            <Typography
              component="span"
              sx={{ fontWeight: 'bold' }}
              fontSize={28}
              fontFamily={'Gmarket Sans'}
            >
              HOT한 작품들!
            </Typography>
          </Typography>
        </Box>
        <Grid
          container
          spacing={{ xs: 2, md: 2 }}
          columns={{ xs: 6, sm: 12, md: 15 }}
        >
          {auctionList.map((value, i) => (
            <Grid item xs={2} sm={3} md={3} key={i}>
              <AuctionCard
                auctionId={value.id}
                title={value.piece.name}
                klay={value.klay}
                vote={value.piece.vote}
                sellerId={value.seller.id}
                sellerName={value.seller.name}
                imgUri={`https://api.nfplatform.com/piece/${value.piece.id}/img`}
              />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Container>
  );
};

export default HomePage;
