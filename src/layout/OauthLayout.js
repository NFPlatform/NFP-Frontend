import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginUserThunk } from '../features/user/UserThunks';
import { useHistory } from 'react-router-dom';

const OauthLayout = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(async () => {
    const code = new URL(window.location.href).searchParams.get('code');
    localStorage.setItem('nfptoken', code);
    await dispatch(
      loginUserThunk({
        token: code,
        afterCallback: () => {
          history.push('/main');
        },
      }),
    );
  }, []);

  return <></>;
};

export default OauthLayout;
