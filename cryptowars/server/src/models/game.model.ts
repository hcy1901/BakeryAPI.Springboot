import {Entity, model, property, hasMany} from '@loopback/repository';
import {Move} from './move.model';

@model()
export class Game extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,