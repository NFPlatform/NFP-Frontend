const CLIENT_ID = '38dcf74ab38b0a33fbc9486eb332420e';
const REDIRECT_URI =
  process.env.REACT_APP_ENV === 'production'
    ? 'https://nfplatform.com/oauth/'
    : 'http://localhost:3000/oauth/';

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&prompt=login`;
