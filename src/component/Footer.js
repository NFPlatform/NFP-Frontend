import logo_white from '../assets/svg/nfp_logo_white.svg';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 0,
        width: 'calc(100% - 360px)',
        minHeight: '85px',
        backgroundColor: '#252323',
        padding: '0 200px 0 160px',
      }}
    >
      <div style={{ display: 'flex' }}>
        <img
          src={logo_white}
          alt={'Logo'}
          style={{
            height: '30px',
            width: 'auto',
          }}
        />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              color: 'white',
              marginLeft: '40px',
              fontSize: '0.8rem',
            }}
          >
            Copyright © nftplatform Inc. All rights reserved.
          </div>
        </div>
      </div>
      <div style={{ display: 'flex' }}>
        <Button style={{ marginRight: '20px' }} variant="text">
          <Link
            style={{
              color: 'white',
              textDecoration: 'none',
              fontSize: '0.8rem',
            }}
            to={{ pathname: 'https://naver.com' }}
            target="_blank"
          >
            이용약관
          </Link>
        </Button>
        <Button style={{ marginRight: '20px' }} variant="text">
          <Link
            style={{
              color: 'white',
              textDecoration: 'none',
              fontSize: '0.8rem',
            }}
            to={{ pathname: 'https://naver.com' }}
            target="_blank"
          >
            개인정보처리방침
          </Link>
        </Button>
        <Button style={{ marginRight: '20px' }} variant="text">
          <Link
            style={{
              color: 'white',
              textDecoration: 'none',
              fontSize: '0.8rem',
            }}
            to={{ pathname: 'https://naver.com' }}
            target="_blank"
          >
            INSTA
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Footer;
