import { caver, NFTContract } from './index';

const getTokenPromise = async (address, i) => {
  const id = await NFTContract.methods.tokenOfOwnerByIndex(address, i).call();
  const uri = await NFTContract.methods.tokenURI(id).call();
  return { id: id, uri: uri };
};

export const getNftListOfAddress = async (address) => {
  const balanceOfNft = await NFTContract.methods.balanceOf(address).call();
  const getTokenPromiseList: Promise[] = [];

  for (let i = 0; i < balanceOfNft; i++) {
    getTokenPromiseList.push(getTokenPromise(address, i));
  }

  return Promise.all(getTokenPromiseList);
};

export const getBalanceOfKlay = async (address) => {
  const klayBalanceHex = await caver.rpc.klay.getBalance(address);
  const klayBalanceString = caver.utils.hexToNumberString(klayBalanceHex);

  return caver.utils.convertFromPeb(klayBalanceString);
};
