import { caver } from './index';
import { COUNT_CONTRACT_ADDRESS } from '../constants/cypress';
import CounterABI from '../abi/CounterABI.json';

const CountContract = new caver.contract(CounterABI, COUNT_CONTRACT_ADDRESS);

export const readCount = async () => {
  const _count = await CountContract.methods.count().call();
  const _getBlockNumber = await CountContract.methods.getBlockNumber().call();

  // console.log(_count, _getBlockNumber);
};

export const setCount = async (newCount) => {
  try {
    const privatekey =
      '0x4925443015d20c3eb612e2aedca16f992b5ecf27102e8ff9eff601018de7b8eb';
    const deployer = caver.wallet.keyring.createFromPrivateKey(privatekey);

    caver.wallet.add(deployer);

    const _receipt = await CountContract.methods.setCount(newCount).send({
      from: deployer.address,
      gas: '2000000',
    });

    // console.log(_receipt);
  } catch (e) {
    // console.log(e);
  }
};
