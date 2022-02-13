import axios from 'axios';
import { checkIfMobile } from '../lib/util/checkIfMobile';

const klipWalletA2AApi = axios.create({
  baseURL: 'https://a2a-api.klipwallet.com/v2/a2a',
});

const bAppName = 'KLAY_MARKE';

const getKlipAccessUrl = (method, requestKey) => {
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
  historyPush,
) => {
  return klipWalletA2AApi
    .post('/prepare', {
      bAppName: {
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
      prepareApiCallback(response, historyPush);
    });
};

export const getKlipAddressApi = (historyPush) => {
  return klipWalletA2AApi
    .post('/prepare', {
      bapp: {
        name: bAppName,
      },
      type: 'auth',
    })
    .then((response) => {
      prepareApiCallback(response, historyPush);
    });
};

const prepareApiCallback = (
  response,
  historyPush,
  afterResultCallback = () => {},
) => {
  const { request_key } = response.data;
  const redirectUrl = getKlipAccessUrl(request_key);
  historyPush(redirectUrl);

  const intervalId = setInterval(async () => {
    const result = await getKlipResultApi();
    if (result.data?.result) {
      if (result.data.result.status === 'success') {
        afterResultCallback();
        clearInterval(intervalId);
      }
    }
  }, 1000);
};
