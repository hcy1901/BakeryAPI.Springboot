## Lightning Network

### Workshop prerequisites

* Setup [docker compose](https://docs.docker.com/compose/install/#install-compose) and Python interpreter >= 3.5 (Windows, Mac or Linux).

### Creating Lightning Network cluster

### Using docker:

Start the Lightning node and Bitcoin node using docker compose:

```
    $ cd docker
    $ docker-compose up

```

Access the docker node using the following command:

```
docker exec -it docker_lnd_1 lncli --rpcserver=localhost:10001 --no-macaroons getinfo
```

### LN commands 

#### Wallet commands

```
lncli create
lncli unlock
lncli walletbalance
lncli newaddress np2wkh
```

#### Connection commands

```
lncli connect 0321b65142d02e6d5eba23d5ce57017dab7b0239993cd0bb099644c1a0f99c4943@localhost:10014
lncli listpeers

lncli openchannel --node_key=0321b65142d02e6d5eba23d5ce57017dab7b0239993cd0bb099644c1a0f99c4943 --local_amt=1000000
lncli listchannels
```

#### Transaction commands

```
lncli addinvoice 