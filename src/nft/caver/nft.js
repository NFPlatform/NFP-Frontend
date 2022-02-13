import { caver, NFTContract } from './index';

const getNftTokenPromise = async (address, i) => {
  const id = await NFTContract.methods.tokenOfOwnerByIndex(address, i).call();
  const uri = await NFTContract.methods.tokenURI(id).call();
  return { tokenId: id, uri: uri };
};

export const getNftListOfAddressPromiseList = async (address) => {
  const balanceOfNft = await NFTContract.methods.balanceOf(address).call();
  const getNftTokenPromiseList: Promise[] = [];

  for (let i = 0; i < balanceOfNft; i++) {
    getNftTokenPromiseList.push(getNftTokenPromise(address, i));
  }

  return getNftTokenPromiseList;
};

export const getBalanceOfKlay = async (address) => {
  const klayBalanceHex = await caver.rpc.klay.getBalance(address);
  const klayBalanceString = caver.utils.hexToNumberString(klayBalanceHex);

  return caver.utils.convertFromPeb(klayBalanceString);
};
