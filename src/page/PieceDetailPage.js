import * as React from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Icon,
  Stack,
  Tooltip,
  tooltipClasses,
  Typography,
} from '@mui/material';
import PieceDetail from '../assets/img/piece_detail.png';
import NfpLogoBlack from '../assets/img/nfp_logo_black.png';
import ArtistImg03 from '../assets/img/artistImg03.png';
import ChonnamUnivLogo from '../assets/img/icon_chonnam_univ_logo@2x.png';
import '../styles/PieceDetailPage.css';
import { Favorite, HelpOutline } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#ffffff',
    color: '#9a9a9a',
    maxWidth: 100,
    fontSize: theme.typography.pxToRem(5),
    border: '1px solid #dadde9',
  },
}));

const PieceDetailPage = ({ match }) => {
  const { pieceId } = match.params;
  return (
    <Container maxWidth={'lg'}>
      <Box
        component={'div'}
        display={'flex'}
        flexDirection={'row'}
        justifyContent={'space-between'}
        mb={15}
        mt={5}
      >
        <img alt="pieceDetail" className={'piece-detail'} src={PieceDetail} />
        <Stack mt={4}>
          <Stack
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            mb={1.5}
          >
            <Typography
              component={'div'}
              variant={'h4'}
              fontWeight={'medium'}
              letterSpacing={-1}
            >
              체리조개행성
            </Typography>
            <Stack
              direction={'row'}
              alignItems={'center'}
              justifyContent={'center'}
              spacing={1}
              sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
                borderRadius: 5,
              }}
              width={50}
              height={30}
            >
              <Favorite sx={{ color: '#f35154', fontSize: 16 }} />
              <Typography variant={'body2'} color={'#616161'}>
                {/*  임시 테스트용으로 넣어본 것*/}
                {pieceId}
              </Typography>
            </Stack>
          </Stack>
          <Stack
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            mb={2}
          >
            <Stack direction={'row'} spacing={1.5}>
              <Typography
                component={'span'}
                variant={'h6'}
                fontWeight={'bold'}
                letterSpacing={-1}
                color={'primary'}
              >
                100
              </Typography>
              <Typography
                component={'span'}
                variant={'h6'}
                letterSpacing={-1}
                color={'primary'}
              >
                KLAY
              </Typography>
            </Stack>
            <Stack
              direction={'row'}
              spacing={1.5}
              alignItems={'center'}
              justifyContent={'center'}
            >
              <Avatar
                alt="nfp_logo"
                src={NfpLogoBlack}
                sx={{ width: 26, height: 26, border: '0.5px solid black' }}
              />
              <Stack direction={'row'} spacing={1.5} alignItems={'center'}>
                <Typography
                  variant={'h6'}
                  letterSpacing={-1}
                  fontWeight={'bold'}
                >
                  5
                </Typography>
                <Typography variant={'h6'} letterSpacing={-1}>
                  NFPT
                </Typography>
                <CustomTooltip
                  title="NFPT는 플랫폼 내에서 사용할 수 있는 토큰으로 다양하게 활용할 수 있습니다!"
                  placement="right-start"
                >
                  <HelpOutline sx={{ color: '#a9a9a9', fontSize: 14 }} />
                </CustomTooltip>
              </Stack>
            </Stack>
          </Stack>
          <Stack width={460} mb={4}>
            <Typography
              variant={'caption'}
              letterSpacing={-0.5}
              color={'#616161'}
            >
              진주가 있을 줄 알았던 조개 안에 체리가 들어있으면 재밌지 않을까?
              하는 상상에서 만든 작품입니다.
            </Typography>
          </Stack>
          <Grid
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            container={true}
            rowSpacing={4}
            columns={2}
            mb={4}
          >
            <Grid container={true} direction="column" item={true} xs={2} md={1}>
              <Typography variant={'body2'} fontWeight={'bold'} mb={1}>
                아티스트
              </Typography>
              <Stack direction={'row'} spacing={2} alignItems={'center'}>
                <Avatar alt="ArtistImg03" src={ArtistImg03} />
                <Typography
                  variant={'body2'}
                  letterSpacing={-0.5}
                  fontWeight={'medium'}
                >
                  wavvism
                </Typography>
              </Stack>
            </Grid>
            <Grid container={true} direction="column" item={true} xs={2} md={1}>
              <Typography variant={'body2'} fontWeight={'bold'} mb={1}>
                콜렉션
              </Typography>
              <Stack direction={'row'} spacing={2} alignItems={'center'}>
                <Avatar alt="ChonnamUnivLogo" src={ChonnamUnivLogo} />
                <Typography
                  variant={'body2'}
                  letterSpacing={-0.5}
                  fontWeight={'medium'}
                >
                  전남대학교 디자인과
                </Typography>
              </Stack>
            </Grid>
            <Grid container={true} direction="column" item={true} xs={2} md={1}>
              <Typography variant={'body2'} fontWeight={'bold'} mb={1}>
                소유자
              </Typography>
              <Stack direction={'row'} spacing={2} alignItems={'center'}>
                <Avatar alt="ArtistImg03" src={ArtistImg03} />
                <Typography
                  variant={'body2'}
                  letterSpacing={-0.5}
                  fontWeight={'medium'}
                >
                  wavvism
                </Typography>
              </Stack>
            </Grid>
          </Grid>
          <Stack mb={7}>
            <Typography variant={'body2'} fontWeight={'bold'} mb={1}>
              전시장
            </Typography>
            <Typography
              variant={'body2'}
              fontWeight={'medium'}
              mb={1}
              color={'primary'}
            >
              광주 nfp 스튜디오
            </Typography>
          </Stack>
          <Stack direction={'row'} alignItems={'center'} spacing={5}>
            <Button
              variant={'contained'}
              color={'secondary'}
              style={{
                borderRadius: '20px',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
              }}
              fullWidth
            >
              작품 소유하기
            </Button>
            <Button
              variant={'text'}
              color={'secondary'}
              style={{
                borderRadius: '20px',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
              }}
              fullWidth
            >
              작품 공유하기
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
};

export default PieceDetailPage;
