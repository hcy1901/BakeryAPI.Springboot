import {Client, expect} from '@loopback/testlab';
import {CryptowarsApplication} from '../..';
import {setupApplication} from './test-helper';

describe('PingController', () => {
  let app: CryptowarsApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  it('invokes GET /ping', async () => {
    const res = await client.