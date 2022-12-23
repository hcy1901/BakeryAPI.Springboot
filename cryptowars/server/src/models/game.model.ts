import {Entity, model, property, hasMany} from '@loopback/repository';
import {Move} from './move.model';

@model()
export class Game extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id: string;

  @property({
    type: 'number',
    default: 20 * 1000,
  })
  gameTime: number;

  @property({
    type: 'number',
    default: 2 * 1000,
  })
  resolveTime: number;

  @property({
    type: 'date',
    generated: true,
    default: new Date(),
  })
  startTime: Date;

  @property({