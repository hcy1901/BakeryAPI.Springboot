
import {Entity, model, property} from '@loopback/repository';

@model()
export class Move extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })