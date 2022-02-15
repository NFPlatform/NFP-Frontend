import axios from 'axios';
import { checkIfMobile } from '../lib/util/checkIfMobile';
import { toast } from 'react-toastify';

const klipWalletA2AApi = axios.create({
  baseURL: 'https://a2a-api.klipwallet.com/v2/a2a',
});

const bAppName = 'KLAY_MARKE';

const getKlipAccessUrl = (requestKey) => {
  const requestUrl = `https://klipwallet.com/?target=/a2a?request_key=${requestKey}`;
  if (checkIfMobile()) {
    return `kakaotalk://klipwallet/open?url=${requestUrl}`;
  } else {
    return requestUrl;
  }
};

export const getKlipResultApi = (requestKey) => {
  return klipWalletA2AApi.get('/result', {
    params: {
      request_key: requestKey,
    },
  });
};

export const executeContractApi = (
  transactionTo,
  transactionAbi,
  transactionValue,
  transactionParams,
  actionWithRedirectUrl,
) => {
  return klipWalletA2AApi
    .post('/prepare', {
      bapp: {
        name: bAppName,
      },
      type: 'execute_contract',
      transaction: {
        to: transactionTo,
        abi: transactionAbi,
        value: transactionValue,
        params: transactionParams,
      },
    })
    .then((response) => {
      prepareApiCallback(response, actionWithRedirectUrl);
    });
};

export const getKlipAddressApi = (
  actionWithRedirectUrl,
  afterResultCallback,
) => {
  return klipWalletA2AApi
    .post('/prepare', {
      bapp: {
        name: bAppName,
      },
      type: 'auth',
    })
    .then((response) => {
      prepareApiCallback(response, actionWithRedirectUrl, afterResultCallback);
    });
};

const prepareApiCallback = (
  response,
  actionWithRedirectUrl,
  afterResultCallback,
) => {
  const requestKey = response.data.request_key;
  const redirectUrl = getKlipAccessUrl(requestKey);
  actionWithRedirectUrl(redirectUrl);

  const intervalId = setInterval(async () => {
    try {
      const result = await getKlipResultApi(requestKey);

      if (result.data?.result) {
        if (result.data.status === 'completed') {
          await afterResultCallback(result);
          clearInterval(intervalId);
        } else if (result.data.status !== 'prepared') {
          clearInterval(intervalId);
          toast.error('오류가 발생하였습니다!');
        }
      }
    } catch (e) {
      clearInterval(intervalId);
      toast.error('오류가 발생하였습니다!');
    }
  }, 1000);
};
