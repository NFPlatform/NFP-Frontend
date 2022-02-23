import {
  Avatar,
  Box,
  Button,
  createTheme,
  Divider,
  Grid,
  Modal,
  Stack,
  TextField,
  ThemeProvider,
  Tooltip,
  Typography,
} from '@mui/material';
import { Edit, ContentCopy, CloseRounded } from '@mui/icons-material';

import { useDispatch, useSelector } from 'react-redux';

import '../styles/MyPage.css';
import AuctionCard from '../component/AuctionCard';
import {
  getBalanceOfKlayThunk,
  getOwnedPieceListThunk,
  getSellingPieceListThunk,
  linkWithKlipWalletThunk,
} from '../features/user/UserThunks';
import { useEffect } from 'react';
import useKlipQrModal from '../hooks/useKlipQrModal';
import OwnedCard from '../component/OwnedCard';
import KlipButton from '../assets/img/klip-login-center.png';
import KlaytnLogo from '../assets/img/klaytn-klay-logo.png';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProfileBackgroundImg from '../assets/img/my-background-camera.png';
import * as React from 'react';

const MyPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const userInfo = useSelector((state) => state.user);

  const { klipQrComponent, actionWithRedirectUrl, modalCloseAction } =
    useKlipQrModal();

  const CopyKlipAddressHex = (text) => {
    if (!document.queryCommandSupported('copy')) {
      return toast.error('복사하기가 지원되지 않는 브라우저입니다.');
    }
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.top = 0;
    textarea.style.left = 0;
    textarea.style.position = 'fixed';

    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    toast.success('클립보드에 복사되었습니다.', {
      toastId: 'main',
    });
  };

  useEffect(async () => {
    if (userInfo.klipAddressHex !== '') {
      await dispatch(
        getBalanceOfKlayThunk({ address: userInfo.klipAddressHex }),
      );
    }
  }, [userInfo.klipAddressHex]);

  useEffect(async () => {
    if (userInfo.klipAddressHex !== '') {
      await dispatch(getOwnedPieceListThunk());
    }
  }, [userInfo.balanceOfKlay]);

  useEffect(async () => {
    if (userInfo.klipAddressHex !== '') {
      await dispatch(getSellingPieceListThunk());
    }
  }, [userInfo.balanceOfKlay]);

  return (
    <div style={{ width: '100%' }}>
      <div style={{ minHeight: '500px' }}>
        {/*<div*/}
        {/*  style={{*/}
        {/*    position: 'absolute',*/}
        {/*    minHeight: '200px',*/}
        {/*    maxHeight: '200px',*/}
        {/*    width: '100%',*/}
        {/*    backgroundColor: '#e5e8eb',*/}
        {/*  }}*/}
        {/*/>*/}
        <img
          src={ProfileBackgroundImg}
          alt="ProfileBackgroundImg"
          style={{
            position: 'absolute',
            width: '100%',
            minHeight: '200px',
            maxHeight: '200px',
            objectFit: 'cover',
          }}
        />
        <div
          style={{
            display: 'flex',
            position: 'relative',
            top: '110px',
            left: 'calc(50% - 70px)',
            width: '140px',
            height: '140px',
            alignItems: 'flex-end',
          }}
        >
          <Avatar
            sx={{
              width: '100%',
              height: '100%',
              backgroundColor: 'white',
            }}
            src={userInfo.thumbnailImg}
            alt="AImage"
          />
          <Edit />
        </div>

        <div
          style={{
            position: 'relative',
            top: '130px',
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              fontSize: '2rem',
              marginLeft: '40px',
              marginRight: '20px',
              letterSpacing: -1,
            }}
          >
            {userInfo.name}
          </div>
          <Edit />
        </div>
        <div
          style={{
            position: 'relative',
            top: '170px',
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {userInfo.klipAddressHex === '' ? (
            <Box
              style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              onClick={(e) => {
                e.preventDefault();
                dispatch(
                  linkWithKlipWalletThunk({
                    actionWithRedirectUrl: actionWithRedirectUrl,
                    modalCloseAction: modalCloseAction,
                    afterResultCallback: () => {
                      history.push('/main');
                    },
                  }),
                );
              }}
            >
              <img
                src={KlipButton}
                alt="KlipButton"
                width="230"
                style={{ maxWidth: 230, minWidth: 210 }}
              />
            </Box>
          ) : (
            <Stack direction={'row'} spacing={5}>
              <Box
                component={'span'}
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
              >
                <Typography
                  component={'div'}
                  letterSpacing={-0.5}
                  fontWeight={500}
                  lineHeight={'120%'}
                  fontSize={14}
                >
                  보유 KLAY
                </Typography>
                <Stack
                  spacing={1.6}
                  direction={'row'}
                  minWidth={53}
                  maxWidth={110}
                  overflow={'hidden'}
                  whiteSpace={'nowrap'}
                >
                  <img
                    src={KlaytnLogo}
                    alt="KlaytnLogo"
                    style={{ width: 25, objectFit: 'contain' }}
                  />
                  <Typography
                    component={'div'}
                    letterSpacing={-0.5}
                    fontWeight={500}
                    fontSize={25}
                  >
                    {userInfo.balanceOfKlay}
                  </Typography>
                </Stack>
              </Box>
              <Box
                component={'span'}
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
              >
                <Typography
                  component={'div'}
                  letterSpacing={-0.5}
                  fontWeight={500}
                  lineHeight={'120%'}
                  fontSize={14}
                >
                  내 지갑 주소
                </Typography>
                <Tooltip
                  title="내 지갑 주소를 복사하세요!"
                  placement="bottom"
                  arrow
                >
                  <Box
                    display={'flex'}
                    flexDirection={'row'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    width={125}
                    sx={{ cursor: 'pointer' }}
                    onClick={() => CopyKlipAddressHex(userInfo.klipAddressHex)}
                  >
                    <Typography
                      component={'div'}
                      letterSpacing={-0.5}
                      fontWeight={500}
                      fontSize={25}
                      overflow={'hidden'}
                      textOverflow={'ellipsis'}
                      whiteSpace={'nowrap'}
                      width={110}
                    >
                      {userInfo.klipAddressHex}
                    </Typography>
                    <ContentCopy sx={{ fontSize: 15 }} />
                  </Box>
                </Tooltip>
              </Box>
              <Box
                component={'span'}
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
              >
                <Typography
                  component={'div'}
                  letterSpacing={-0.5}
                  fontWeight={500}
                  lineHeight={'120%'}
                  fontSize={14}
                >
                  보유 NFPT
                </Typography>
                <Typography
                  component={'div'}
                  letterSpacing={-0.5}
                  fontWeight={500}
                  fontSize={25}
                >
                  {userInfo.nfpt}
                </Typography>
              </Box>
            </Stack>
          )}
        </div>
      </div>
      <div
        style={{
          width: '60%',
          padding: '0 20%',
        }}
      >
        <div
          style={{ marginBottom: '8px', letterSpacing: -0.5, fontWeight: 500 }}
        >
          판매 중인 작품
        </div>
        <Divider color="grey" sx={{ width: '13%' }} />
        <div style={{ margin: '50px 15px' }}>
          <Grid
            container
            spacing={{ xs: 2, md: 2 }}
            columns={{ xs: 4, sm: 9, md: 9 }}
          >
            {userInfo.sellingPieceList.map((value, i) => (
              <Grid item xs={2} sm={3} md={3} key={i}>
                <AuctionCard
                  auctionId={value.id}
                  title={value.piece.name}
                  klay={value.klay}
                  vote={value.piece.vote}
                  sellerId={value.seller.id}
                  sellerName={value.seller.name}
                  imgUri={value.uri}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>

      <div
        style={{
          width: '60%',
          padding: '0 20%',
        }}
      >
        <div
          style={{ marginBottom: '8px', letterSpacing: -0.5, fontWeight: 500 }}
        >
          보유작품
        </div>
        <Divider color="grey" sx={{ width: '13%' }} />
        <div style={{ margin: '50px 15px' }}>
          <Grid
            container
            spacing={{ xs: 2, md: 2 }}
            columns={{ xs: 4, sm: 9, md: 9 }}
          >
            {userInfo.ownedPieceList.map((value, i) => (
              <Grid item xs={2} sm={3} md={3} key={i}>
                <OwnedCard
                  pieceId={value.id}
                  title={value.name}
                  vote={value.vote}
                  sellerId={value.artist.id}
                  sellerName={value.artist.name}
                  imgUri={`https://api.nfplatform.com/piece/${value.id}/img`}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
      {klipQrComponent}
    </div>
  );
};

export default MyPage;
