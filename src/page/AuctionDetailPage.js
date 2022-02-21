import * as React from 'react';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
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
import {
  CloseRounded,
  Favorite,
  HelpOutline,
  Check,
} from '@mui/icons-material';
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
  const [checked, setChecked] = useState([]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    console.log('currentIndex================>', currentIndex);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    console.log('newChecked================>', newChecked);

    setChecked(newChecked);
  };

  const consentList = [
    '[필수] 양수도계약 조건 및 유의사항을 확인하였으며 동의함',
    '[필수] 청약철회 및 환불에 대한 규정을 확인하였으며 동의함',
    '[필수] 양수도계약 체결을 위한 개인정보 제3자 제공에 동의함',
  ];

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
          src={`https://api.nfplatform.com/piece/${auctionDetail.piece.id}/img`}
        />
        <Stack mt={4}>
          <Stack direction={'row'} mb={1.5}>
            <Typography
              component={'div'}
              fontWeight={'medium'}
              letterSpacing={-1}
              variant={'h4'}
            >
              {auctionDetail.piece.name}
            </Typography>
            <Stack
              alignItems={'center'}
              direction={'row'}
              height={30}
              justifyContent={'center'}
              spacing={1}
              sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
                borderRadius: 5,
              }}
              width={50}
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
            width: 390,
            height: 260,
            bgcolor: 'background.paper',
            borderRadius: 3,
            boxShadow: 3,
            paddingTop: 6,
            paddingBottom: 3,
            px: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography fontWeight={600} sx={{ position: 'absolute', top: '6%' }}>
            작품 구매
          </Typography>
          <CloseRounded
            sx={{
              position: 'absolute',
              top: '6%',
              right: '5%',
              cursor: 'pointer',
            }}
            onClick={() => {
              setBuyModal(false);
            }}
          />
          <List sx={{ mt: 0.5, width: '100%', maxWidth: 400 }}>
            {consentList.map((value, valueIndex) => {
              const labelId = `checkbox-list-label-${valueIndex}`;

              return (
                <ListItem key={valueIndex} disablePadding sx={{ mt: 1 }}>
                  <ListItemButton
                    role={undefined}
                    onClick={handleToggle(valueIndex)}
                    dense
                    sx={{
                      borderRadius: 2,
                      paddingY: 0.3,
                      border: `${
                        checked.indexOf(valueIndex) !== -1
                          ? '1.4px solid rgba(0, 0, 0, 0.8)'
                          : '1.2px solid rgba(0, 0, 0, 0.05)'
                      }`,
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 30 }}>
                      <Checkbox
                        edge="start"
                        icon={
                          <Check
                            sx={{
                              fontSize: 15,
                              color: `${
                                checked.indexOf(valueIndex) !== -1
                                  ? 'rgba(0, 0, 0, 0.8)'
                                  : 'rgba(0, 0, 0, 0.3)'
                              }`,
                            }}
                          />
                        }
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      id={labelId}
                      primary={value}
                      sx={{
                        color: `${
                          checked.indexOf(valueIndex) !== -1
                            ? 'rgba(0, 0, 0, 0.8)'
                            : 'rgba(0, 0, 0, 0.3)'
                        }`,
                        letterSpacing: -0.5,
                        '& .MuiTypography-root': {
                          fontSize: 14,
                          fontWeight: `${
                            checked.indexOf(valueIndex) !== -1 ? 500 : 400
                          }`,
                        },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>

          <Stack direction={'row'} spacing={1} alignItems={'center'} mb={2.5}>
            <Avatar
              alt="nfp_logo"
              src={NfpLogoBlack}
              sx={{ width: 18, height: 18, border: '0.5px solid black' }}
            />
            <Typography
              variant={'body2'}
              letterSpacing={-1}
              fontWeight={'bold'}
              color={'secondary'}
            >
              {auctionDetail.nfpToken}
            </Typography>
            <Typography variant={'body2'} letterSpacing={-1} fontWeight={500}>
              NFPT 획득 가능
            </Typography>
          </Stack>

          <Button
            variant={'contained'}
            color={'secondary'}
            style={{
              borderRadius: '20px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
            }}
            fullWidth
            onClick={buyPiece}
          >
            작품 소유하기
          </Button>
        </Box>
      </Modal>
      {klipQrComponent}
    </Container>
  );
};

export default AuctionDetailPage;
