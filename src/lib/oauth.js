const CLIENT_ID = 'ef85dae41b5958e5685451b8204bf3cc';
const REDIRECT_URI = 'http://localhost:3000/oauth/';

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&prompt=login`;
