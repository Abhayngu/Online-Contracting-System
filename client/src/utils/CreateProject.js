import Bidding from '../build/contracts/Bidding.json';
import contract_instance from './getContract';
import getWeb3 from './getWeb3';


const createProject = async (id,seconds,userAddress) =>{
    console.log(id);
    var instance;
    const init = async () => {
        instance = await contract_instance();
        console.log(instance);
    };
    await init();
    console.log(instance);
        
    // const userAddress = '0x8fC21B3666f1CD8E6134ac152d1770ecD6AA65C9';
    // var message = "success";
    await instance.methods.createProject(id,seconds).send({
            from: userAddress
            // value: web3.utils.toWei('1', 'ether')
    })
        
    // .on('error', (error) => {
    //     if (error.code === 4001) {
    //       // User rejected the transaction in MetaMask
    //     //   console.log("User rejected the transaction");
    //     return "User rejected the transaction";
    //     } else {
    //     //   console.log(error);
    //     return "Some condition didn't met";
    //       // Handle the error in some way, such as displaying a message to the user
    //     }
    //   })
    //   .then((receipt) => {
    //     // console.log(receipt);
    //     return "Transaction Successful";
    //     // Handle the successful transaction in some way
    //   });
    // console.log(tx);

    // tx.on('transactionHash', function(hash) {
    //     console.log('Transaction hash:', hash);
    // }).on('confirmation', function(confirmationNumber, receipt) {
    //     console.log('Confirmation number:', confirmationNumber);
    // }).on('receipt', function(receipt) {
    //     console.log('Transaction receipt:', receipt);
    // }).on('error', function(error) {
    //     console.error(error);
    // });
    // console.log(message);
    // return message;

    
};

export default createProject;
  