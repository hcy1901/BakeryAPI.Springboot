import {CryptowarsApplication} from '../..';
import {
  createRestAppClient,
  givenHttpServerConfig,
  Client,
} from '@loopback/testlab';

export async function setupApplication(): Promise<AppWithClient> {
  const app = new CryptowarsApplication({
    rest: givenHttpServerConfig(),
  });

  await app.boot()