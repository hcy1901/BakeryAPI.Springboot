import {CryptowarsApplication} from './application';
import {ApplicationConfig} from '@loopback/core';

export {CryptowarsApplication};

export async function main(options: ApplicationConfig = {}) {
  const app = new CryptowarsApplication(options);
  options.rest = {
    cors: {
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204,
      maxAge: 86400,
      credentials