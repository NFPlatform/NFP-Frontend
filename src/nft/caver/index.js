import Caver from 'caver-js';
import CounterABI from '../abi/CounterABI.json';
import KIP17ABI from '../abi/KIP17TokenABI.json';

import {
  ACCESS_KEY_ID,
  CHAIN_ID,
  NFT_CONTRACT_ADDRESS,
  SECRET_ACCESS_KEY,
} from '../constants/cypress';

const option = {
  headers: [
    {
      name: 'Authorization',
      value:
        'Basic ' +
        Buffer.from(ACCESS_KEY_ID + ':' + SECRET_ACCESS_KEY).toString('base64'),
    },
    { name: 'x-chain-id', value: CHAIN_ID },
  ],
};

export const caver = new Caver(
  new Caver.providers.HttpProvider(
    'https://node-api.klaytnapi.com/v1/klaytn',
    option,
  ),
);

export const NFTContract = new caver.contract(KIP17ABI, NFT_CONTRACT_ADDRESS);

export * from './nft';
