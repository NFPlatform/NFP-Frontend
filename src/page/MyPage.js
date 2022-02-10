import {
  Avatar,
  Button,
  createTheme,
  Divider,
  ThemeProvider,
} from '@mui/material';
import { Edit } from '@mui/icons-material';
import { useSelector } from 'react-redux';

import '../styles/MyPage.css';
import { brown } from '@mui/material/colors';

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
          width: '80%',
          padding: '0 10%',
        }}
      >
        <div style={{ marginBottom: '10px' }}>보유작품</div>
        <Divider color="grey" sx={{ width: '13%' }} />
        <div style={{ margin: '50px 25px' }}>sdfsdfsdf</div>
      </div>
    </div>
  );
};

export default MyPage;
