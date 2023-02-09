import {Client, expect} from '@loopback/testlab';
import {CryptowarsApplication} from '../..';
import {setupApplication} from './test-helper';

describe('PingController', () => {
  let app: CryptowarsApplication;
  let client