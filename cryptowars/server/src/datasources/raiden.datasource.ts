import {juggler} from '@loopback/service-proxy';

const RaidenHost = 'http://127.0.0.1:5002';

export const RaidenDataSource: juggler.DataSource = new juggler.DataSource({
  name: 'Raiden',
  connector: 'rest',
  options: {
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
  },
  operations: [
    {
      template: {
        method: 'GET',
        url: `${RaidenHost}/api/v1/payments/{token}`,
        responsePath: '$',
      },
      functions: {
        payments: ['token'],
      },
    },
    {
      template: {
        method: 'POST',
        url: `${RaidenHost}/api/v1/payments/{token}/{target}`,
        body: {
          amount: "{amount:number}",
          identifier: "{identifier:number}"
        },
        responsePath: '$',
      },
      functions: {
        pay: ['token', 't