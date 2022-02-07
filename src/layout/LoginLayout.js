import { useDispatch } from 'react-redux';
import { Button, Card } from '@mui/material';
import { Link } from 'react-router-dom';
import { KAKAO_AUTH_URL } from '../lib/oauth';
import kakaoBtn from '../assets/img/kakaolink_btn_small.png';
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
          }}
        >
          <div style={{ fontSize: '1.7rem' }}>졸업작품 NFT 전시 플랫폼</div>
          <div>대학생들의</div>
          <div>
            <b>청춘 열정 미래</b>를
          </div>
          <div>감상해보세요!</div>
        </div>
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'column',
            marginRight: '10%',
            padding: 3,
            borderRadius: '30px',
          }}
        >
          <div
            style={{
              flex: 1,
              textAlign: 'center',
              margin: '10px 0',
              fontSize: '1.4rem',
            }}
          >
            전시회 입장
          </div>
          <Button sx={{ flex: 1 }}>
            <Link
              style={{
                display: 'flex',
                background: '#FEE500',
                textDecoration: 'none',
                minWidth: '18vw',
                minHeight: '40px',
                borderRadius: '12px',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'rgba(0,0,0,0.85)',
              }}
              to={{ pathname: KAKAO_AUTH_URL }}
              target="_blank"
            >
              <img
                src={kakaoBtn}
                alt="KakaoLogo"
                style={{
                  width: '25px',
                  height: '25px',
                }}
              />
              카카오로 로그인
            </Link>
          </Button>
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
