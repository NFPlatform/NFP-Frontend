import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Avatar,
  Box,
  Button,
  Container,
  Input,
  InputAdornment,
  TextField,
} from '@mui/material';
import { Search } from '@mui/icons-material';

import nfpLogo from '../assets/img/nfp_logo.png';
import { Link, useHistory } from 'react-router-dom';
import { getUserInfoThunk } from '../features/user/UserThunks';

const HeaderLink = ({ to, children }) => {
  return (
    <Button variant="text">
      <Link
        style={{
          color: 'black',
          textDecoration: 'none',
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
        <img
          src={nfpLogo}
          alt="Logo"
          style={{
            width: '80px',
            height: 'auto',
          }}
        />
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
      <Button
        sx={{
          borderRadius: '20px',
          backgroundImage:
            'linear-gradient(to right, #f0bbe8 0%, #deb1e3 25%, #d0a8de 51%, #c09eda 76%, #ad93d4 100%)',
        }}
        variant="contained"
      >
        🎨 작가등록
      </Button>
      <Link to="/main/my">
        <Avatar
          sx={{ marginX: 1 }}
          alt="My"
          src="https://mui.com/static/images/avatar/1.jpg"
        />
      </Link>
      <Button sx={{ color: 'black' }} variant="text">
        로그아웃
      </Button>
    </Box>
  );
};

export default Header;
