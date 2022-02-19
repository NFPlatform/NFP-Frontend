import { useDispatch } from 'react-redux';
import { Box, Button, Card } from '@mui/material';
import { Link } from 'react-router-dom';
import { KAKAO_AUTH_URL } from '../lib/oauth';
import KakaoLoginLargeWide from '../assets/img/kakao_login_large_wide.png';
import background from '../assets/img/login_page_background.png';
import backgroundVideo from '../assets/video/210718_export.mp4';
import nfpWhiteLogoSvg from '../assets/svg/nfp_logo_white.svg';

const LoginLayout = () => {
  const dispatch = useDispatch();

  return (
    <div
      style={{
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <video style={{ width: '100%', height: 'auto' }} autoPlay loop muted>
        <source src={backgroundVideo} type="video/mp4" />
      </video>
      <div
        style={{
          position: 'fixed',
          top: '0',
          left: '0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '100%',
          width: '100%',
          backgroundColor: 'rgba(0,0,0,0.45)',
        }}
      >
        <div
          style={{
            color: 'white',
            marginLeft: '8%',
            fontSize: '4rem',
            letterSpacing: -0.5,
          }}
        >
          <div style={{ fontSize: '1.7rem', marginBottom: 5 }}>
            졸업작품 NFT 전시 플랫폼
          </div>
          <div style={{ letterSpacing: -4 }}>
            <div
              style={{
                fontFamily: 'Gmarket Sans',
                fontWeight: 300,
              }}
            >
              대학생들의
            </div>
            <div style={{ fontFamily: 'Gmarket Sans', fontWeight: 300 }}>
              <span
                style={{
                  fontFamily: 'Gmarket Sans',
                  fontWeight: 500,
                  letterSpacing: -7,
                }}
              >
                청춘 열정 미래
              </span>
              를
            </div>
            <div style={{ fontFamily: 'Gmarket Sans', fontWeight: 300 }}>
              감상해보세요!
            </div>
          </div>
        </div>
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'column',
            marginRight: '10%',
            padding: 3,
            borderRadius: '22px',
            maxWidth: 300,
            minWidth: 280,
          }}
        >
          <div
            style={{
              flex: 1,
              textAlign: 'center',
              marginBottom: '20px',
              fontSize: '1.4rem',
              fontWeight: 600,
            }}
          >
            전시회 입장
          </div>
          <Box
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Link
              style={{
                display: 'flex',
                justifyContent: 'center',
                width: '13vw',
                height: '40px',
              }}
              to={{ pathname: KAKAO_AUTH_URL }}
              target="_blank"
            >
              <img src={KakaoLoginLargeWide} alt="KakaoLoginLargeWide" />
            </Link>
          </Box>
        </Card>
      </div>
      <img
        style={{
          position: 'fixed',
          width: '140px',
          height: 'auto',
          top: '50px',
          right: '90px',
        }}
        src={nfpWhiteLogoSvg}
        alt="Logo"
      />
    </div>
  );
};

export default LoginLayout;
