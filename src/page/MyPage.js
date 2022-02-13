import {
  Avatar,
  Button,
  createTheme,
  Divider,
  Grid,
  ThemeProvider,
} from '@mui/material';
import { Edit } from '@mui/icons-material';
import { brown } from '@mui/material/colors';

import { useSelector } from 'react-redux';

import '../styles/MyPage.css';
import AuctionCard from '../component/AuctionCard';

const theme = createTheme({
  palette: {
    primary: {
      main: brown[500],
    },
  },
});

const MyPage = () => {
  const userInfo = useSelector((state) => state.user);

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
          <ThemeProvider theme={theme}>
            <Button variant="contained" color="primary">
              Klip 지갑 연결하기
            </Button>
          </ThemeProvider>
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
