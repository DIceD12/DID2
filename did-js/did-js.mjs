// import { DID } from '@decentralized-identity/did-common-typescript';
import pkg from '@decentralized-identity/did-common-typescript';
const { DID } = pkg;


async function didCreat() {
    const did = new DID();
    const { publicKey, privateKey } = did.generateKeyPair();
    const didDocument = await did.register({ publicKey, privateKey });
    return didDocument
}

var response = didCreat();
console.log(response);