import React, { useEffect, useState } from 'react';
// import getWalletAddress from '../utils/connection';
import getWalletAddress from '../utils/connection';
import createProject  from '../utils/CreateProject';
function MyComponent() {
  const [wallterAddress, setWalletAddress] = useState('');
  const [success , setSuccess] = useState('');

  useEffect(() => {
    // Get the wallet address when the component mounts
    // console.log('Inside use effect')
    // const message = await func_(1);
    // const message = await func_(1);
    // const init = async () => {
		// 	const instance = await func_(1);
		// 	setSuccess(instance);
		// };
		// init();
    // setSuccess(message);
    // func_(1);
    const init = async () => {
      const temp = await createProject("kdfkdf",100,'0x43E44529f5BA6c97179f4511E5e593Ed52c7769e');
    };
    init();

    var userAddress;
    getWalletAddress()
      .then(address => {
        setWalletAddress(address);
        // userAddress = address;
      })
      .catch(error => {
        console.error(`Error getting wallet address: ${error}`);
      });
    console.log(userAddress);
    // func_("shubham",userAddress);
  }, []);
  return (
    <div>
      <p>Wallet address: {wallterAddress+" "+success}</p>
    </div>
  );
}

export default MyComponent;
