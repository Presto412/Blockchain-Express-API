# Blockchain Express API

A very simple implementation of my interpretation of the blockchain concept. Not exactly decentralized, the chain is stored in local database and so are the blocks, with the chain reference to the blocks by ObjectId. So you can consider this a single full node. Transactions(blocks) can be added according to the API documentation, and their ObjectIds are stored in the chain. 

# Usage
 Cloning the repository and installing packages.
```shell
$ git clone https://github.com/Presto412/Blockchain-Express-API.git
$ cd Blockchain-Express-API
$ npm install
```
Starting the server
```shell
$ ./node_modules/.bin/nodemon
```
