
import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  del,
  requestBody,
} from '@loopback/rest';
import {Move} from '../models';
import {MoveRepository} from '../repositories';

const web3Utils = require('web3-utils');

export class MoveController {
  constructor(
    @repository(MoveRepository)
    public moveRepository : MoveRepository,
  ) {}

  @post('/move', {
    responses: {
      '200': {
        description: 'Move model instance',
        content: {'application/json': {schema: {'x-ts-type': Move}}},
      },
    },
  })
  async create(@requestBody() move: Move): Promise<Move> {
    return await this.moveRepository.create(move);
  }

  @get('/move/count', {
    responses: {
      '200': {
        description: 'Move model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Move)) where?: Where,
  ): Promise<Count> {
    return await this.moveRepository.count(where);