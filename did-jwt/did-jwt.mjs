// import didJWT from 'did-jwt';
// const { default: didJWT } = await import("did-jwt");
import * as didJWT from 'did-jwt';

const signer = didJWT.ES256KSigner(didJWT.hexToBytes('278a5de700e29faae8e40e366ec5012b5ec63d36ec77e8a2417154cc1d25383f'))

let jwt = await didJWT.createJWT(
  { aud: 'did:ethr:0xf3beac30c498d9e26865f34fcaa57dbb935b0d74', iat: undefined, name: 'uPort Developer' },
  { issuer: 'did:ethr:0xf3beac30c498d9e26865f34fcaa57dbb935b0d74', signer },
  { alg: 'ES256K' }
)
console.log(jwt)

//pass the jwt from step 1
let decoded = didJWT.decodeJWT(jwt)
console.log(decoded)

// import {expect} from '@jest/globals';
import pkg from '@jest/globals';
const {expect} = pkg;

expect(decoded).toEqual({
    header: { alg: 'ES256K', typ: 'JWT' },
    payload: {
      aud: 'did:ethr:0xf3beac30c498d9e26865f34fcaa57dbb935b0d74',
      name: 'uPort Developer',
      iss: 'did:ethr:0xf3beac30c498d9e26865f34fcaa57dbb935b0d74'
    },
    signature: 'mAhpAnw-9u57hyAaDufj2GPMbmuZyPDlU7aYSUMKk7P_9_cF3iLk-hFjFhb5xaUQB5nXYrciw6ZJ2RSAZI-IDQ',
    data: 'eyJhbGciOiJFUzI1NksiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJkaWQ6ZXRocjoweGYzYmVhYzMwYzQ5OGQ5ZTI2ODY1ZjM0ZmNhYTU3ZGJiOTM1YjBkNzQiLCJuYW1lIjoidVBvcnQgRGV2ZWxvcGVyIiwiaXNzIjoiZGlkOmV0aHI6MHhmM2JlYWMzMGM0OThkOWUyNjg2NWYzNGZjYWE1N2RiYjkzNWIwZDc0In0'
  })


import {Resolver} from 'did-resolver';
import {getResolver} from 'ethr-did-resolver'

let resolver = new Resolver({...getResolver({infuraProjectId: '<get a free ID from infura.io>'})});

// use the JWT from step 1
let verificationResponse = await didJWT.verifyJWT(jwt, {
  resolver,
  audience: 'did:ethr:0xf3beac30c498d9e26865f34fcaa57dbb935b0d74'
})
console.log(verificationResponse)

expect(verificationResponse).toEqual({
  payload: {
    aud: 'did:ethr:0xf3beac30c498d9e26865f34fcaa57dbb935b0d74',
    name: 'uPort Developer',
    iss: 'did:ethr:0xf3beac30c498d9e26865f34fcaa57dbb935b0d74'
  },
  didResolutionResult: {
    didDocumentMetadata: {},
    didResolutionMetadata: { contentType: 'application/did+ld+json' },
    didDocument: {
      '@context': [
        'https://www.w3.org/ns/did/v1',
        'https://w3id.org/security/suites/secp256k1recovery-2020/v2'
      ],
      id: 'did:ethr:0xf3beac30c498d9e26865f34fcaa57dbb935b0d74',
      verificationMethod: [
        {
          id: 'did:ethr:0xf3beac30c498d9e26865f34fcaa57dbb935b0d74#controller',
          type: 'EcdsaSecp256k1RecoveryMethod2020',
          controller: 'did:ethr:0xf3beac30c498d9e26865f34fcaa57dbb935b0d74',
          blockchainAccountId: 'eip155:1:0xF3beAC30C498D9E26865F34fCAa57dBB935b0D74'
        }
      ],
      authentication: [
        'did:ethr:0xf3beac30c498d9e26865f34fcaa57dbb935b0d74#controller'
      ],
      assertionMethod: [
        'did:ethr:0xf3beac30c498d9e26865f34fcaa57dbb935b0d74#controller'
      ]
    }
  },
  issuer: 'did:ethr:0xf3beac30c498d9e26865f34fcaa57dbb935b0d74',
  signer: {
    id: 'did:ethr:0xf3beac30c498d9e26865f34fcaa57dbb935b0d74#controller',
    type: 'EcdsaSecp256k1RecoveryMethod2020',
    controller: 'did:ethr:0xf3beac30c498d9e26865f34fcaa57dbb935b0d74',
    blockchainAccountId: 'eip155:1:0xF3beAC30C498D9E26865F34fCAa57dBB935b0D74'
  },
  jwt: 'eyJhbGciOiJFUzI1NksiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJkaWQ6ZXRocjoweGYzYmVhYzMwYzQ5OGQ5ZTI2ODY1ZjM0ZmNhYTU3ZGJiOTM1YjBkNzQiLCJuYW1lIjoidVBvcnQgRGV2ZWxvcGVyIiwiaXNzIjoiZGlkOmV0aHI6MHhmM2JlYWMzMGM0OThkOWUyNjg2NWYzNGZjYWE1N2RiYjkzNWIwZDc0In0.mAhpAnw-9u57hyAaDufj2GPMbmuZyPDlU7aYSUMKk7P_9_cF3iLk-hFjFhb5xaUQB5nXYrciw6ZJ2RSAZI-IDQ',
  policies: {}
})