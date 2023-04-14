import Bidding from '../build/contracts/Bidding.json';
// import getWeb3 from './getWeb3';
// const web3 = await getWeb3();

// const web3 = new Web3('http://localhost:7545')
// var contract = require('@truffle/contract');


// async function createParty(name) {
//   const instance = await loadcontract();
//   instance.createParty(name);
// }


async function getWalletAddress() {
    // console.log(Web3.eth.currentProvider);
    // console.log(getWeb3.eth);
    // const web3 = await getWeb3();
    // console.log(web3.eth.getAccounts()[0]);
    return new Promise((resolve, reject) => {
      if (typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask) {
        window.ethereum.request({ method: 'eth_accounts' })
          .then(accounts => {
            if (accounts.length > 0) {
              resolve(accounts[0]);
            } else {
              reject('No accounts available');
            }
          })
          .catch(error => {
            reject(`Error retrieving accounts: ${error}`);
          });
      } else {
        reject('Metamask is not installed or not enabled');
      }
    });
}

// async function loadContract () {
//   const contractAddress = '0x1aeF0b8c69953B9350bEba7a34431B0f8d6Eabb2';
//   const contractInstance = new web3.eth.Contract(Bidding, contractAddress)
//   // const theContract = contract(Bidding);
//   theContract.setProvider(Web3.eth.currentProvider);
//   const todoContract = await theContract.deployed();
//   return todoContract;
// };
  

// const loadWeb3 = async () => {
//     // Modern dapp browsers...
//     if (window.ethereum) {
//         window.web3 = new Web3(ethereum);
//         try {
//             // Request account access if needed
//             await ethereum.enable();
//             // Acccounts now exposed
//             web3.eth.sendTransaction({/* ... */});
//         } catch (error) {
//             // User denied account access...
//         }
//     }
//     // Legacy dapp browsers...
//     else if (window.web3) {
//         window.web3 = new Web3(web3.currentProvider);
//         // Acccounts always exposed
//         web3.eth.sendTransaction({/* ... */});
//     }
//     // Non-dapp browsers...
//     else {
//         console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
//     }
// };

// function getWalletAddress(){
//   // return window.ethereum.request({ method: 'eth_accounts' });
//   return "kdfkjd";
// }

// const loadcontract = async() => {
//   const web3 = await getWeb3();
//   const contractAddress = '0x1aeF0b8c69953B9350bEba7a34431B0f8d6Eabb2';
//   const contract = new web3.eth.Contract(Bidding, contractAddress);
//   return contract;
// }

// export default getWalletAddress;

export default getWalletAddress;