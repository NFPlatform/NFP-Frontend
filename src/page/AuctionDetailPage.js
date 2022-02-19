import * as React from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Modal,
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
import { CloseRounded, Favorite, HelpOutline } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  buyPieceThunk,
  getAuctionDetailThunk,
} from '../features/auction/AuctionThunks';
import useKlipQrModal from '../hooks/useKlipQrModal';

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

const AuctionDetailPage = ({ match }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [buyModal, setBuyModal] = useState(false);

  const auctionDetail = useSelector((state) => state.auction.auctionDetail);

  const { klipQrComponent, actionWithRedirectUrl, modalCloseAction } =
    useKlipQrModal();

  const { auctionId } = match.params;

  useEffect(async () => {
    await dispatch(getAuctionDetailThunk({ auctionId: auctionId }));
  }, [auctionId]);

  const buyPiece = async () => {
    if (auctionDetail.id !== -1) {
      await dispatch(
        buyPieceThunk({
          auctionId: auctionDetail.id,
          pieceId: auctionDetail.piece.id,
          actionWithRedirectUrl: actionWithRedirectUrl,
          modalCloseAction: modalCloseAction,
          afterResultCallback: () => {
            history.push('/main/my');
          },
        }),
      );
    }
  };

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
        <img
          alt="pieceDetail"
          className={'piece-detail'}
          src={
            process.env.REACT_APP_ENV === 'production'
              ? `https://api.nfplatform.com/piece/${auctionDetail.piece.id}/img`
              : `http://localhost:6040/piece/${auctionDetail.piece.id}/img`
          }
        />
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
              {auctionDetail.piece.name}
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
                {auctionDetail.piece.vote}
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
                {auctionDetail.klay}
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
                  {auctionDetail.nfpToken}
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
              {auctionDetail.piece.bio}
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
                  {auctionDetail.piece.artist.name}
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
                  {auctionDetail.seller.name}
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
              onClick={() => {
                setBuyModal(true);
              }}
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
      <Modal
        open={buyModal}
        onClose={() => {
          setBuyModal(false);
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 220,
            height: 230,
            bgcolor: 'background.paper',
            borderRadius: 5,
            boxShadow: 3,
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          여기 채워줘요 여기 채워줘요 여기 채워줘요 여기 채워줘요 여기 채워줘요
          여기 채워줘요 여기 채워줘요 여기 채워줘요 여기 채워줘요 여기 채워줘요
          여기 채워줘요 여기 채워줘요 여기 채워줘요
          <CloseRounded
            sx={{
              position: 'absolute',
              top: '5%',
              right: '5%',
              cursor: 'pointer',
            }}
            onClick={() => {
              setBuyModal(false);
            }}
          />
          <Button variant="contained" color="primary" onClick={buyPiece}>
            구매버튼
          </Button>
        </Box>
      </Modal>
      {klipQrComponent}
    </Container>
  );
};

export default AuctionDetailPage;
