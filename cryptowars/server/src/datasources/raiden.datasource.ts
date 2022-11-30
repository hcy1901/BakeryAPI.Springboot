import {juggler} from '@loopback/service-proxy';

const RaidenHost = 'http://127.0.0.1:5002';

export const RaidenDataSource: juggler.DataSource = new juggler.DataSource({
  name: 'Raiden',
  connector: 'rest',
  options: {
    headers: {
      accept: 'application/json',
      'content-typ