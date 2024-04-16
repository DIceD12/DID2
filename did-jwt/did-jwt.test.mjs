// import {expect} from '@jest/globals';
import pkg from '@jest/globals';
const {expect} = pkg;

const decoded = require

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