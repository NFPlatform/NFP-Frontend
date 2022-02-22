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

export const executeContractApi = async (
  transactionTo,
  transactionAbi,
  transactionValue,
  transactionParams,
  actionWithRedirectUrl,
  modalCloseAction,
  afterResultCallback = () => {},
) => {
  const stringParams = generateParamsString(transactionParams);
  const response = await klipWalletA2AApi.post('/prepare', {
    bapp: {
      name: bAppName,
    },
    type: 'execute_contract',
    transaction: {
      to: transactionTo,
      abi: transactionAbi,
      value: transactionValue,
      params: stringParams,
    },
  });

  await prepareApiCallback(
    response,
    actionWithRedirectUrl,
    modalCloseAction,
    afterResultCallback,
  );
};

const generateParamsString = (transactionParams = []) => {
  return '[' + transactionParams.map((param) => `\"${param}\"`).join(',') + ']';
};

export const getKlipAddressApi = async (
  actionWithRedirectUrl,
  modalCloseAction,
  afterResultCallback,
) => {
  const response = await klipWalletA2AApi.post('/prepare', {
    bapp: {
      name: bAppName,
    },
    type: 'auth',
  });
  await prepareApiCallback(
    response,
    actionWithRedirectUrl,
    modalCloseAction,
    afterResultCallback,
  );
};

const prepareApiCallback = async (
  response,
  actionWithRedirectUrl,
  modalCloseAction,
  afterResultCallback,
) => {
  const requestKey = response.data.request_key;
  const redirectUrl = getKlipAccessUrl(requestKey);
  await actionWithRedirectUrl(redirectUrl, response.data);

  const intervalId = setInterval(async () => {
    try {
      const result = await getKlipResultApi(requestKey);

      if (result.data?.result) {
        const requestStatus = result.data.status;
        if (requestStatus === 'requested') {
          toast.info({
            content: '진행중 입니다.',
            options: {
              id: 'loading',
            },
          });
        }
        if (result.data.status === 'completed') {
          if (result.data.result.status === 'fail') {
            console.log('result.data.status === "fail"');
            modalCloseAction();
            toast.error('오류가 발생하였습니다.');
          } else {
            modalCloseAction();
            await afterResultCallback(result, requestKey);
            toast.info('완료되었습니다.');
          }
          clearInterval(intervalId);
        }
        if (requestStatus === 'canceled') {
          console.log('result.data.status === "canceled"');
          modalCloseAction();
          clearInterval(intervalId);
          toast.info('취소되었습니다.');
        }
        if (requestStatus === 'error') {
          console.log('result.data.status === "error"');
          modalCloseAction();
          clearInterval(intervalId);
          toast.error('오류가 발생하였습니다.');
        }
      }
    } catch (e) {
      console.log(e);
      clearInterval(intervalId);
      toast.error('오류가 발생하였습니다!');
    }
  }, 1000);
};
