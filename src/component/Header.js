import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Box, Button, InputAdornment, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';

import nfpLogo from '../assets/img/nfp_logo.png';
import { Link, useHistory } from 'react-router-dom';
import { getUserInfoThunk } from '../features/user/UserThunks';

import '../assets/fonts/font.css';

const HeaderLink = ({ to, children }) => {
  return (
    <Button variant="text">
      <Link
        style={{
          color: 'black',
          textDecoration: 'none',
          fontFamily: 'BM Dohyeon',
          fontSize: '1.1rem',
        }}
        to={to}
      >
        {children}
      </Link>
    </Button>
  );
};

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const isArtist = useSelector((state) => state.user.isArtist);
  const thumbnailImg = useSelector((state) => state.user.thumbnailImg);

  useEffect(async () => {
    const token = localStorage.getItem('nfptoken');
    if (token === null || token === undefined) {
      history.push('/login');
    } else {
      await dispatch(getUserInfoThunk());
    }
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        padding: '25px 80px 20px 40px',
        alignItems: 'center',
        height: '62px',
      }}
    >
      <Box sx={{ marginX: 1, marginRight: '60px', marginLeft: '30px' }}>
        <Link
          style={{
            width: '80px',
          }}
          to="/main"
        >
          <img
            src={nfpLogo}
            alt="Logo"
            style={{
              width: '80px',
              height: 'auto',
            }}
          />
        </Link>
      </Box>
      <TextField
        sx={{
          flexGrow: 1,
          marginRight: '15px',
          '& .MuiOutlinedInput-root': {
            borderRadius: '50px',
          },
          '& .MuiOutlinedInput-input': {
            fontFamily: 'Noto Sans KR',
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
        size="small"
        placeholder="찾고 싶은 키워드나 작품을 검색해 주세요!"
      />
      <HeaderLink to="/hi">작품구경</HeaderLink>
      <HeaderLink to="/hi">전시회</HeaderLink>
      <HeaderLink to="/hi">커뮤티니</HeaderLink>
      <HeaderLink to="/hi">NFT카페</HeaderLink>
      {isArtist ? (
        <Button
          sx={{
            borderRadius: '20px',
            backgroundImage:
              'linear-gradient(to right, #f091f7 0%, #f184d8 25%, #f279be 51%, #f36ea2 76%, #f4638a 100%)',
          }}
          variant="contained"
        >
          <Link
            style={{
              color: 'white',
              textDecoration: 'none',
              fontSize: '1.1rem',
              fontFamily: 'BM Dohyeon',
            }}
            to="/main/home"
          >
            🖼️ 작품등록
          </Link>
        </Button>
      ) : (
        <Button
          sx={{
            borderRadius: '20px',
            backgroundImage:
              'linear-gradient(to right, #f0bbe8 0%, #deb1e3 25%, #d0a8de 51%, #c09eda 76%, #ad93d4 100%)',
          }}
          variant="contained"
        >
          <Link
            to="/main/register/artist"
            style={{
              color: 'white',
              textDecoration: 'none',
              fontSize: '1.1rem',
              fontFamily: 'BM Dohyeon',
            }}
          >
            🎨 작가등록
          </Link>
        </Button>
      )}
      <Link to="/main/my">
        <Avatar sx={{ marginX: 1 }} alt="My" src={thumbnailImg} />
      </Link>
      <Button
        sx={{ color: 'black', fontFamily: 'BM Dohyeon', fontSize: '1.1rem' }}
        variant="text"
      >
        로그아웃
      </Button>
    </Box>
  );
};

export default Header;
