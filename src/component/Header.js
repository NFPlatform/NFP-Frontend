import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Avatar,
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { Search } from '@mui/icons-material';

import nfpLogo from '../assets/img/nfp_logo.png';
import { Link, useHistory } from 'react-router-dom';
import {
  getUserInfoThunk,
  setKlipWalletThunk,
} from '../features/user/UserThunks';

import '../assets/fonts/font.css';
import { toast } from 'react-toastify';

const HeaderLink = ({ to, children }) => {
  const preparingToast = () => {
    toast.success('아직 준비중입니다.');
  };
  return (
    <>
      {to === '/hi' ? (
        <Button
          variant="text"
          sx={{ mr: 2.5, borderRadius: 10 }}
          onClick={preparingToast}
        >
          <Typography
            style={{
              color: 'black',
              textDecoration: 'none',
              fontFamily: 'Gmarket Sans',
              fontWeight: 500,
              fontSize: '1.1rem',
            }}
            to={to}
          >
            {children}
          </Typography>
        </Button>
      ) : (
        <Button variant="text" sx={{ mr: 2.5, borderRadius: 10 }}>
          <Link
            style={{
              color: 'black',
              textDecoration: 'none',
              fontFamily: 'Gmarket Sans',
              fontWeight: 500,
              fontSize: '1.1rem',
            }}
            to={to}
          >
            {children}
          </Link>
        </Button>
      )}
    </>
  );
};

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const isArtist = useSelector((state) => state.user.isArtist);
  const thumbnailImg = useSelector((state) => state.user.thumbnailImg);

  const [searchValue, setSearchValue] = useState('');
  const searchInputRef = useRef();

  useEffect(async () => {
    const token = localStorage.getItem('nfptoken');
    if (token === null || token === undefined) {
      history.push('/login');
    } else {
      await dispatch(
        getUserInfoThunk({
          forbiddenCallback: () => {
            localStorage.removeItem('nfptoken');
            history.push('/login');
          },
        }),
      );
    }

    const klaytnAddress = localStorage.getItem('klaytnAddress');
    if (klaytnAddress !== null && klaytnAddress !== undefined) {
      await dispatch(setKlipWalletThunk({ klaytnAddress: klaytnAddress }));
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
      <Box sx={{ marginX: 1, marginRight: '40px', marginLeft: '30px' }}>
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
          marginRight: '16px',
          '& .MuiOutlinedInput-root': {
            borderRadius: '50px',
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
        inputRef={searchInputRef}
        size="small"
        placeholder="찾고 싶은 키워드나 작품을 검색해 주세요!"
        onKeyPress={(event) => {
          if (event.key === 'Enter') {
            history.push('/main/piece');
            searchInputRef.current.blur();
          }
        }}
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
      />
      <HeaderLink to="/main/piece">작품구경</HeaderLink>
      <HeaderLink to="/hi">전시회</HeaderLink>
      <HeaderLink to="/main/community">커뮤니티</HeaderLink>
      <HeaderLink to="/hi">NFT카페</HeaderLink>
      {isArtist ? (
        <Button
          sx={{
            marginRight: 1.5,
            borderRadius: '20px',
            paddingTop: '4px',
            paddingBottom: '1.7px',
            paddingRight: '22px',
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
              fontFamily: 'Gmarket Sans',
            }}
            to="/main/register/piece"
          >
            🖼️ 작품등록
          </Link>
        </Button>
      ) : (
        <Button
          sx={{
            marginRight: 1.5,
            borderRadius: '20px',
            paddingTop: '4px',
            paddingBottom: '1.7px',
            paddingRight: '22px',
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
              fontFamily: 'Gmarket Sans',
              fontWeight: 500,
            }}
          >
            🎨 작가등록
          </Link>
        </Button>
      )}
      <Link to="/main/my">
        <Avatar
          sx={{ marginX: 1, backgroundColor: 'white' }}
          alt="My"
          src={thumbnailImg}
        />
      </Link>
      <Button
        sx={{
          color: 'black',
          fontWeight: 500,
          fontSize: '1rem',
          letterSpacing: -0.5,
          marginLeft: 0.3,
          borderRadius: 10,
        }}
        variant="text"
        onClick={() => {
          localStorage.removeItem('nfptoken');
          history.push('/login');
        }}
      >
        로그아웃
      </Button>
    </Box>
  );
};

export default Header;
