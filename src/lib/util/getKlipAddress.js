import { toast } from 'react-toastify';

const getKlipAddressFromStore = (getState, rejectWithValue) => {
  const state = getState();
  const userWallet = state.user.klipAddressHex;
  if (userWallet === '') {
    toast.error('지갑 연동이 필요합니다.');
    rejectWithValue('지갑 연동이 필요합니다.');
  } else {
    return userWallet;
  }
};

export default getKlipAddressFromStore;
