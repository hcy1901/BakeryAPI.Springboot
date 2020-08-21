# cryptowars

To play the game, you need to install the client part on your local computer, which runs a Raiden node:

```
git clone https://github.com/loredanacirstea/cryptowars.git
cd cryptowars/client
npm install
npm run serve
```

Then go to http://127.0.0.1:8080/ to play the game!

The game client will need to make Raiden payments on your behalf, so you need to run Raiden with the correct `--rpccorsdomain` flag.
Currently, the game server runs on Raiden version `r