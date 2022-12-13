import {CryptowarsApplication} from './application';
import {ApplicationConfig} from '@loopback/core';

export {CryptowarsApplication};

export async function main(options: ApplicationConfig = {}) {
  const app = new CryptowarsApplication(options);
  options.rest = {
    cors: {
   