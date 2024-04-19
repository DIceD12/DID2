import * as didJWT from 'did-jwt';

async function didJWTCreat() {
  const signer = didJWT.ES256KSigner(didJWT.hexToBytes('278a5de700e29faae8e40e366ec5012b5ec63d36ec77e8a2417154cc1d25383f'))
  let jwt = await didJWT.createJWT(
    { aud: 'did:ethr:0xf3beac30c498d9e26865f34fcaa57dbb935b0d74', iat: undefined, name: 'uPort Developer' },
    { issuer: 'did:ethr:0xf3beac30c498d9e26865f34fcaa57dbb935b0d74', signer },
    { alg: 'ES256K' }
  )
  return jwt
}
jwt = didJWTCreat()
console.log(jwt)

async function didJWTdecoded(jwt) {
  let decoded = didJWT.decodeJWT(jwt)
  return decoded
}

decoded = didJWTdecoded(jwt)
console.log(decoded)


import {Resolver} from 'did-resolver';
import {getResolver, verificationMethodTypes} from 'ethr-did-resolver'

async function didJWTverify(jwt) {
  let resolver = new Resolver({...getResolver({infuraProjectId: '<get a free ID from infura.io>'})}); // change the source
  let verificationResponse = await didJWT.verifyJWT(jwt, {
    resolver,
    audience: 'did:ethr:0xf3beac30c498d9e26865f34fcaa57dbb935b0d74'
  })
  return verificationResponse
}

verificationResponse = didJWTverify(jwt)
console.log(verificationResponse)
