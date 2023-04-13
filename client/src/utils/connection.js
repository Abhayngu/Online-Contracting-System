import Bidding from '../build/contracts/Bidding.json';
import Web3 from 'web3';
// var contract = require('@truffle/contract');

function getWalletAddress() {
    return new Promise((resolve, reject) => {
      // Check if Metamask is installed and enabled
      if (typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask) {
        // Get the current wallet address
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

export default getWalletAddress;