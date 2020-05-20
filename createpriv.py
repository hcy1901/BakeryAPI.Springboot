import binascii

from web3.auto import w3
with open("ropsten/keystore/UTC--2019-07-02T09-52-48.427220854Z--ed02d134589abc166c10990a015e53b6ac14a277") as keyfile:
    encrypted_key = keyfile.read()
    private_key = w3.eth.account.decrypt(encrypted_key, 'koshik93')
print(binascii.b2a_hex(private_key))
