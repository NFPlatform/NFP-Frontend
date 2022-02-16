import { caver, NFTContract } from './index';
import { MARKET_CONTRACT_ADDRESS } from '../constants/cypress';
import { getAuctionListApi } from '../../lib/api/auction';

const getNftTokenPromise = async (address, i) => {
  const id = await NFTContract.methods.tokenOfOwnerByIndex(address, i).call();
  const uri = await NFTContract.methods.tokenURI(id).call();
  return { tokenId: id, uri: uri };
};

export const getNftListOfAddressPromiseList = async (address) => {
  const balanceOfNft = await NFTContract.methods.balanceOf(address).call();
  const getNftTokenPromiseList = [];

  for (let i = 0; i < balanceOfNft; i++) {
    getNftTokenPromiseList.push(getNftTokenPromise(address, i));
  }

  return getNftTokenPromiseList;
};

export const getBalanceOfKlay = async (address) => {
  const klayBalanceHex = await caver.rpc.klay.getBalance(address);
  const klayBalanceString = caver.utils.hexToNumberString(klayBalanceHex);

  return caver.utils.convertFromPeb(klayBalanceString, 'KLAY');
};

export const getNftListOfAddress = async (address, backendApi) => {
  const getNftTokenPromiseList = await getNftListOfAddressPromiseList(address);

  const pieceListFromChain = await Promise.all(getNftTokenPromiseList);

  const pieceListFromBackendResult = await backendApi();
  const pieceListFromBackend = pieceListFromBackendResult.data;

  console.log('pieceListFromChain====================>', pieceListFromChain);
  console.log('pieceListFromBackend==================>', pieceListFromBackend);

  const pieceList = pieceListFromChain.map((pieceFromChain) => {
    const { tokenId, uri } = pieceFromChain;
    const matchPiece = pieceListFromBackend.filter(
      (pieceFromBackend) => `${pieceFromBackend.piece.id + 1000}` === tokenId,
    );
    if (matchPiece.length === 0) {
      return { tokenId: tokenId, uri: uri };
    } else {
      const piece = matchPiece[0];
      piece.uri = uri;
      return piece;
    }
  });

  const result = pieceList.filter((piece) => piece.id);
  console.log('result================================>', result);
  return result;
};
