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
import {Context} from '@loopback/context';
import {Game, Move} from '../models';
import {GameRepository} from '../repositories';
import {MoveController} from './move.controller';
import {Raiden} from './raiden.controller';
import {RaidenDataSource} from '../datasources';

import {RockPaperScissorsGetWinner, RockPaperScissorsGetLoser} from '../rpsWinner';

export class GameController {
  constructor(
    @repository(GameRepository)
    public gameRepository : GameRepository,
  ) {}

  @post('/game', {
    responses: {
      '200': {
        description: 'Game model instance',
        content: {'application/json': {schema: {'x-ts-type': Game}}},
      },
    },
  })
  async create(@requestBody() game: Game): Promise<Game> {
    game.startTime = new Date();
    return await this.gameRepository.create(game);
  }

  @get('/game/count', {
    responses: {
      '200': {
        description: 'Game model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Game)) where?: Where,
  ): Promise<Count> {
    return await this.gameRepository.count(where);
  }

  @get('/game', {
    responses: {
      '200': {
        description: 'Array of Game model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Game}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Game)) filter?: Filter,
  ): Promise<Game[]> {
    return await this.gameRepository.find(filter);
  }

  @patch('/game', {
    responses: {
      '200': {
        description: 'Game PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() game: Game,
    @param.query.object('where', getWhereSchemaFor(Game)) where?: Where,
  ): Promise<Count> {
    return await this.gameRepository.updateAll(game, where);
  }

  @get('/game/{id}', {
    responses: {
      '200': {
        description: 'Game model instance',
        content: {'application/json': {schema: {'x-ts-type': Game}}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Game> {
    // Check if date is > after resolution time
    // get all game moves sorted -> calculate entire amount received by the game
    // calculate winning move -> count all the winners -> get amount of guardian ->  amount/winner
    // connect to Guardian Raiden node -> get all game payments by payment identifiers (identifier > x)
    // calculate
    // send Raiden payments to all winners
    let game: Game;
    let currentTime, resolveTime;
    let moves: Move[], winningMoves: Move[] = [];
    let moveController;
    let total_amount: number = 0, winner_amount: number, guardian_amount: number;
    let move_count: any = {
        '1': {
            rock: 0,
            paper: 0,
            scissors: 0,
        },
        '2': {
            rock: 0,
            paper: 0,
            scissors: 0,
        }
    };
    let sorted_moves_1: any = [], sorted_moves_2: any = [];
    let winningMove: string, move1: string, move2: string;
    let gameUpdate: Partial<Game>;
    let raidenPayment: any, raidenPayments: any;

    // TODO - token should be in the move model
    const token = '0xc778417E063141139Fce010982780140Aa0cD5Ab';

    game = await this.gameRepository.findById(id);
    currentTime = new Date().getTime();
    resolveTime = game.startTime.getTime() + game.gameTime + game.resolveTime;

    if (game.winningMove || game.inProgress || currentTime < resolveTime) {
        return game;
    }

    moveController = new MoveController(await this.gameRepository.move);

    // There should be a single move for a game
    moves = await moveController.find({where: {gameId: id}, order: ["_id ASC"]});

    if (moves.length == 0) {
        return game;
    }

    raidenPayments = await this.getRaidenPayments(token);
    for (let i = 0; i < moves.length; i++) {
        let sentMove: Move = moves[i];

        if (sentMove.amount && sentMove.move) {
            raidenPayment = raidenPayments[0].find((payment: any) => {
                return payment.identifier === sentMove.paymentIdentifier;
            });
            console.log('raidenPayment', raidenPayment);
            if (raidenPayment) {
                total_amount += sentMove.amount;
                move_count[sentMove.playerId][sentMove.move] += 1;
                winningMoves.push(sentMove);
            }
        }
    }
    console.log('total_amount', total_amount);
    console.log('move_count', move_count);
    sorted_moves_1 = Object.entries(move_count['1']).sort((a: any, b: any) => {
        return a[1] - b[1];
    });
    sorted_moves_2 = Object.entries(move_count['2']).sort((a: any, b: any) => {
        return a[1] - b[1];
    });
    console.log('sorted_moves_1', sorted_moves_1);
    console.log('sorted_moves_2', sorted_moves_2);

    move1 = sorted_moves_1[2][1] > 0 ? sorted_moves_1[2][0] : null;
    move2 = sorted_moves_2[2][1] > 0 ? sorted_moves_2[2][0] : RockPaperScissorsGetLoser[move1];

    winningMove = RockPaperScissorsGetLoser[move1] == move2 ? move1 : move2;

    guardian_amount = total_amount / 10;
    total_amount -= guardian_amount;
    winner_amount = total_amount / moves.length;

    gameUpdate = {
        winningMove,
        move1,
        move2,
        amount: winner_amount,
        playe