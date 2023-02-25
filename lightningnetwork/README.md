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