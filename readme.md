Install this before setting up the frontend, backend and blockchain

1. Ganache
2. Truffle
3. Nodejs
4. Metamask extension

After cloning our repository there are two folders (of importance) server and client and a file .gitignore to not push the mentioned path in git
This readme file is there only.

Steps to setup backend :

1. Go to server directory using -> cd server

2. To install all the necessary package use -> npm install

3. I have pushed config.env file inside the config directory which is inside the server which contains the port at which server is going to run as well as the url through which it is going to be connected with the database

4. To run the server type the following command in the server directory -> npm run dev

5. If everything runs fine you will see a line of 'server started at port 2000' and the next line would be 'database connected .. '

Steps to setup frontend :

1. Go to client directory using -> cd client

2. To install all the necessary package use -> npm install

3. To run the client server which will by default run on port 3000 enter the following command -> npm run start

Steps to connect with Ganache locally:

1.Install Ganache on Desktop

2. In the project folder move to the director /client/src

3. Run truffle migrate --reset command

4. Now open Ganache and craete a workspace and select the truffle-config.js

5. This will create some addresses and will show the transaction

6. If Ganache is running on port 8545 switch it to port 7586

Steps to connect with MetaMask:

1. First add the metamask Extension in the chrome browser

2. Click on Add Network and add the ganache network using running on localhost

3. Click on Account and Import address from ganache by intering the private key

4.Keep the Metamask wallet connected
