import { useEffect, useState } from 'react';
import getWalletAddress from '../utils/connection';
function MyComponent() {
  const [walletAddress, setWalletAddress] = useState('');

  useEffect(() => {
    // Get the wallet address when the component mounts
    getWalletAddress()
      .then(address => {
        setWalletAddress(address);
      })
      .catch(error => {
        console.error(`Error getting wallet address: ${error}`);
      });
  }, []);

  return (
    <div>
      <p>Wallet address: {walletAddress}</p>
    </div>
  );
}

export default MyComponent;
