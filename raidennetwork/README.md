## Raiden Network

### Workshop prerequisites

* Install python>=3.7

* Install the Ethereum client (Geth)

    ```
        sudo add-apt-repository -y ppa:ethereum/ethereum
        sudo apt-get update
        sudo apt-get install ethereum
    ```
* Create an Ethereum account:
    ```
    geth --datadir node1/ account new
    
    ```  

* Install MetaMask plugin for the browser (Firefox, Chrome, Opera)

* Create an Ethereum account through MetaMask and point it to **Ropsten** network

* Request Ethereum fund through [https://faucet.ropsten.be](https://faucet.ropsten.be)
 
* Convert ETH to WETH using an exchange: [https://0x.org/portal/weth](https://0x.org/portal/weth)
    
* Create an account in [https://infura.io](https://infura.io) to connect to an Ethereum full node

### Raiden Network setup

Install through PyPi (Make sure you are using python >=3.7)

```
pip install raiden

```

Start the Raiden client:

```
raiden --network-id ropsten --keystore-path  ~/.ethereum/testnet/keystore --eth-rpc-endpoint "https://ropsten.infura.io/v3/52df69ef00614e059a707918df501d90" --environment-type development --rpccorsdomain http://127.0.0.1:8