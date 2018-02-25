/* eslint-disable no-unused-vars */

import Mirage from 'ember-cli-mirage';

import handleCommandEnd from './helpers/handle-command-end';

export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  this.urlPrefix = 'http://localhost:8080';    // make this `http://localhost:8080`, for example, if your API is on a different server
  this.namespace = '/api/v1';    // make this `/api`, for example, if your API is namespaced
  this.timing = 400;      // delay for each request, automatically set to 0 during testing

  this.get('/users/:id');
  this.get('/games/:id');

  this.post('/users', (schema, request) => {
      const name = JSON.parse(request.requestBody).name;
      return schema.users.create({id: 2, name});
  });

  this.post('/users/login', (schema, request) => {
      const name = JSON.parse(request.requestBody).name;
      if (name !== 'Rastikko') {
          return new Mirage.Response(401, {}, {message: 'Unauthorized'});
      }
      return schema.users.findBy({name});
  });

  this.post('/games/find', (schema, request) => {
    schema.db.users.update(2, {gameId: 1});
    return schema.games.find(1);
  });

  this.post('/games/commands', (schema, request) => {
    const gameCommandType = JSON.parse(request.requestBody).type;
    const game = schema.games.find(1);
    const gamePhaseType = game.attrs.gamePhase.type;

    if (gameCommandType === 'COMMAND_DRAW') {
        for (let i = 0; i < 2; i++) {
            const newCard = game.attrs.gamePlayers[0].hand[i];
            game.attrs.gamePlayers[1].hand.push(newCard);
        }
    }

    if (gameCommandType === 'COMMAND_HARVEST') {
        game.attrs.gamePlayers[1].energy++;
    }

    if (gameCommandType === 'COMMAND_END') {
        handleCommandEnd(schema, request, game);
    }

    schema.db.games.update(game.attrs);
    return game;
  });
}
