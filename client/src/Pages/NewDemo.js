import React, { useState, useEffect } from 'react';
import ContractContext from './ContractContext';
import MyContract from './MyContract.json';
import Web3 from 'web3';

const MyComponent = () => {
  const [contractInstance, setContractInstance] = useState(null);

  useEffect(() => {
    const init = async () => {
        const instance = await contract_instance();
        setContractInstance(contract);
    };
    init();
    getWalletAddress()
      .then(address => {
        setWalletAddress(address);
      })
      .catch(error => {
        console.error(`Error getting wallet address: ${error}`);
      });
    
  }, []);

  return (
    <ContractContext.Provider value={contractInstance}>
      {/* rest of your component */}
    </ContractContext.Provider>
  );
};

export default MyComponent;
