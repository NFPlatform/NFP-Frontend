import {
  Avatar,
  Box,
  Button,
  createTheme,
  Divider,
  Grid,
  Modal,
  ThemeProvider,
} from '@mui/material';
import { Edit } from '@mui/icons-material';
import { brown } from '@mui/material/colors';
import QRCode from 'qrcode.react';

import { useDispatch, useSelector } from 'react-redux';

import '../styles/MyPage.css';
import AuctionCard from '../component/AuctionCard';
import {
  getBalanceOfKlayThunk,
  linkWithKlipWalletThunk,
} from '../features/user/UserThunks';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';

const theme = createTheme({
  palette: {
    primary: {
      main: brown[500],
    },
  },
});

const MyPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const userInfo = useSelector((state) => state.user);

  const [klipWalletRegisterModal, setKlipWalletRegisterModal] = useState(false);
  const [klipWalletRegisterUrl, setKlipWalletRegisterUrl] = useState('');

  useEffect(async () => {
    if (userInfo.klipAddressHex !== '') {
      await dispatch(
        getBalanceOfKlayThunk({ address: userInfo.klipAddressHex }),
      );
    }
  }, [userInfo.klipAddressHex]);

  return (
    <div style={{ width: '100%' }}>
      <div style={{ minHeight: '350px' }}>
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
            <ThemeProvider theme={theme}>
              <Button
                variant="contained"
                color="primary"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(
                    linkWithKlipWalletThunk({
                      actionWithRedirectUrl: (redirectUrl) => {
                        if (redirectUrl.startsWith('kakaotalk')) {
                          history.push(redirectUrl);
                        } else {
                          setKlipWalletRegisterUrl(redirectUrl);
                          setKlipWalletRegisterModal(true);
                        }
                      },
                      afterResultCallback: async () => {
                        setKlipWalletRegisterModal(false);
                      },
                    }),
                  );
                }}
              >
                Klip 지갑 연결하기
              </Button>
            </ThemeProvider>
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
        <div style={{ marginBottom: '10px' }}>보유작품</div>
        <Divider color="grey" sx={{ width: '13%' }} />
        <div style={{ margin: '50px 15px' }}>
          <Grid
            container
            spacing={{ xs: 2, md: 2 }}
            columns={{ xs: 4, sm: 9, md: 12 }}
          >
            {ownedPiece.map((value, i) => (
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
        </div>
      </div>
      <Modal
        open={klipWalletRegisterModal}
        onClose={() => {
          setKlipWalletRegisterModal(false);
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000000',
            boxShadow: 2,
            p: 4,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <QRCode
            value={klipWalletRegisterUrl}
            size={350}
            style={{ margin: 'auto' }}
          />
        </Box>
      </Modal>
    </div>
  );
};

const ownedPiece = [
  {
    auctionId: 1,
    auctionTokenId: 'sdf',
    klay: 120,
    vote: 0,
    category: 'art',
    sellerName: 'wavvism',
    sellerId: 1,
  },
  {
    auctionId: 1,
    auctionTokenId: 'sdf',
    klay: 120,
    vote: 0,
    sellerName: 'wavvism',
    sellerId: 1,
  },
  {
    auctionId: 1,
    auctionTokenId: 'sdf',
    klay: 120,
    vote: 0,
    sellerName: 'wavvism',
    sellerId: 1,
  },
  {
    auctionId: 1,
    auctionTokenId: 'sdf',
    klay: 120,
    vote: 0,
    sellerName: 'wavvism',
    sellerId: 1,
  },
  {
    auctionId: 1,
    auctionTokenId: 'sdf',
    klay: 120,
    vote: 0,
    sellerName: 'wavvism',
    sellerId: 1,
  },
  {
    auctionId: 1,
    auctionTokenId: 'sdf',
    klay: 120,
    vote: 0,
    sellerName: 'wavvism',
    sellerId: 1,
  },
  {
    auctionId: 1,
    auctionTokenId: 'sdf',
    klay: 120,
    vote: 0,
    sellerName: 'wavvism',
    sellerId: 1,
  },
  {
    auctionId: 1,
    auctionTokenId: 'sdf',
    klay: 120,
    vote: 0,
    sellerName: 'wavvism',
    sellerId: 1,
  },
  {
    auctionId: 1,
    auctionTokenId: 'sdf',
    klay: 120,
    vote: 0,
    sellerName: 'wavvism',
    sellerId: 1,
  },
];

export default MyPage;
