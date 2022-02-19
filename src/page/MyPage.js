import {
  Avatar,
  Box,
  Button,
  createTheme,
  Divider,
  Grid,
  ThemeProvider,
} from '@mui/material';
import { Edit } from '@mui/icons-material';
import { brown } from '@mui/material/colors';

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
import { useHistory } from 'react-router-dom';

const MyPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const userInfo = useSelector((state) => state.user);

  const { klipQrComponent, actionWithRedirectUrl, modalCloseAction } =
    useKlipQrModal();

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
      <div style={{ minHeight: '400px' }}>
        <div
          style={{
            position: 'absolute',
            minHeight: '120px',
            width: '100%',
            backgroundColor: '#e5e8eb',
          }}
        />
        <div
          style={{
            display: 'flex',
            position: 'relative',
            top: '70px',
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
          />
          <Edit />
        </div>

        <div
          style={{
            position: 'relative',
            top: '90px',
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
            }}
          >
            {userInfo.name}
          </div>
          <Edit />
        </div>
        <div
          style={{
            position: 'relative',
            top: '120px',
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
            <div>
              <div>address</div>
              <div>{userInfo.klipAddressHex}</div>
              <div>klay</div>
              <div>{userInfo.balanceOfKlay}</div>
            </div>
          )}
        </div>
      </div>
      <div
        style={{
          width: '60%',
          padding: '0 20%',
        }}
      >
        <div style={{ marginBottom: '10px' }}>판매 중인 작품</div>
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
        <div style={{ marginBottom: '10px' }}>보유작품</div>
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
                  klay={0}
                  vote={value.vote}
                  sellerId={value.artist.id}
                  sellerName={value.artist.name}
                  imgUri={value.uri}
                  forSelling={false}
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
