import Bidding from '../build/contracts/Bidding.json';
import getWalletAddress from './connection';
import getWeb3 from './getWeb3';
// const web3 = await getWeb3();


// async function createParty(name) {
//   const instance = await loadcontract();
//   instance.createParty(name);
// }

// const loadcontract = async() => {
//   const web3 = await getWeb3();
//   const contractAddress = '0x1aeF0b8c69953B9350bEba7a34431B0f8d6Eabb2';
//   const contract = new web3.eth.Contract(Bidding, contractAddress);
//   return contract;
// }

// async function createParty(name){
//     console.log(name);
// }

async function loadWeb3 (name,userAddress) {
    // var userAddress;
    //     getWalletAddress()
    //     .then(address => {
    //         userAddress=address;
    //         // userAddress = address;
    //     })
    //     .catch(error => {
    //         console.error(`Error getting wallet address: ${error}`);
    //     });
    console.log(name,userAddress);
    try {
        console.log(name,userAddress);
        const web3 = await getWeb3();
        console.log(web3);
        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = Bidding.networks[networkId];
        console.log(deployedNetwork,deployedNetwork.address);
        const instance = new web3.eth.Contract(
            Bidding.abi,
            deployedNetwork && deployedNetwork.address
        );
        console.log(deployedNetwork,deployedNetwork.address);

        
        const tx = instance.methods.createParty(name).send({
            from: userAddress
            // value: web3.utils.toWei('1', 'ether')
        })
        console.log(tx);

        tx.on('transactionHash', function(hash) {
            console.log('Transaction hash:', hash);
        }).on('confirmation', function(confirmationNumber, receipt) {
            console.log('Confirmation number:', confirmationNumber);
        }).on('receipt', function(receipt) {
            console.log('Transaction receipt:', receipt);
        }).on('error', function(error) {
            console.error(error);
        });

    //   const transactionObject = instance.methods.createParty("shubham");

    //   web3.eth.sendTransaction({
    //     from: '0x8fC21B3666f1CD8E6134ac152d1770ecD6AA65C9',
    //     to: deployedNetwork.address,
    //     gas: 1000000,
    //     value: web3.utils.toWei('1', 'ether'),
    //     data: transactionObject.encodeABI()
    //   })
    //   .on('transactionHash', function(hash){
    //     console.log("Transaction hash: " + hash);
    //   })
    //   .on('confirmation', function(confirmationNumber, receipt){
    //     console.log("Confirmation number: " + confirmationNumber);
    //   })
    //   .on('receipt', function(receipt){
    //     console.log("Transaction receipt: " + receipt);
    //   })
    //   .on('error', function(error){
    //     console.error(error);
    //   });
      


    //   const transactionObject = {
    //     from: '0x8fC21B3666f1CD8E6134ac152d1770ecD6AA65C9', // sender address
    //     to: deployedNetwork.address, // recipient address
    //     value: web3.utils.toWei('1', 'ether'), // amount to send
    //     gas: 200000, // gas limit
    //     gasPrice: web3.utils.toWei('10', 'gwei'), // gas price
    //     nonce: 0 // nonce
    //   };
      
    //   web3.eth.sendTransaction(transactionObject)
    //     .then((txHash) => {
    //       console.log(`Transaction hash: ${txHash}`);
    //     })
    //     .catch((error) => {
    //       console.error(`Error sending transaction: ${error}`);
    //     });

    //   const transactionObject = {
    //     from: '0x8fC21B3666f1CD8E6134ac152d1770ecD6AA65C9', // The Ethereum address you want to call the function from
    //     to: deployedNetwork.address, // The address of the contract you want to call
    //     data: instance.methods['createParty']('Shubham').encodeABI(), // The encoded function call data
    //     gas: 2000000 // The gas limit for the transaction
    // };
    
    // web3.eth.personal.signTransaction(transactionObject, '0x8fC21B3666f1CD8E6134ac152d1770ecD6AA65C9')
    //     .then((signedTx) => {
    //         web3.eth.sendSignedTransaction(signedTx.raw)
    //             .on('transactionHash', function(hash){
    //                 console.log('Transaction hash:', hash);
    //             })
    //             .on('receipt', function(receipt){
    //                 console.log('Transaction receipt:', receipt);
    //             });
    //     });


    //   instance.createParty("shubham");
    // console.log(instance);
    // instance.methods.createParty('shubham').call(function(error, result) {
    //     // Handle the result or error
    //     if(result){
    //         console.log(result);
    //     }
    //     if(error){
    //         console.log(error);
    //     }
    // });
    
    } catch (error) {
      console.error("Error:", error);
    }
  };


export default loadWeb3;