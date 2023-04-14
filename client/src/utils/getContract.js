import Bidding from '../build/contracts/Bidding.json';
// import getWalletAddress from './connection';
import getWeb3 from './getWeb3';

const get_contract = async () => {
    
        console.log("contract");
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
        console.log("contract",instance);
        return instance;
    
}
// 64397bf2af640aeace4ff9ea 
// 64397bf2af640aeace4ff9ea 
export default get_contract;