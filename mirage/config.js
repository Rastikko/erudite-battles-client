/* eslint-disable no-unused-vars */

function handleCommandEnd(schema, request, game) {
    const gamePhaseType = game.attrs.gamePhase.type;

    if (gamePhaseType === 'PHASE_GATHER') {
        const gamePhase = {
          id: game.gamePhase.id + 1,
          type: "PHASE_PLAN"
        }
        game.attrs.gamePhase = gamePhase;
        return;
    }

    if (gamePhaseType === 'PHASE_PLAN') {
        const gamePhase = {
          id: game.gamePhase.id + 1,
          type: "PHASE_BATTLE_PREPARATION"
        }
        game.attrs.gamePhase = gamePhase;
        return;
    }

    if (gamePhaseType === 'PHASE_BATTLE_PREPARATION') {
        const gamePhase = {
          id: game.gamePhase.id + 1,
          type: "PHASE_BATTLE"
        }
        game.attrs.gamePlayers[0].currentGameQuestion = schema.gameQuestions.find(1);
        game.attrs.gamePlayers[1].currentGameQuestion = schema.gameQuestions.find(2);

        game.attrs.gamePhase = gamePhase;
        return;
    }

    if (gamePhaseType === 'PHASE_BATTLE' && game.attrs.gamePlayers[0].health === 100) {
        const gamePhase = {
          id: game.gamePhase.id + 1,
          type: "PHASE_OUTCOME"
        }
        game.attrs.gamePlayers[0].health = 0;
        game.attrs.gamePlayers[1].health = 100;
        game.attrs.gamePhase = gamePhase;
        return;
    }

    if (gamePhaseType === 'PHASE_BATTLE') {
        const gamePhase = {
          id: game.gamePhase.id + 1,
          type: "PHASE_BATTLE_RESOLUTION"
        }
        game.attrs.gamePlayers[0].health = 100;
        game.attrs.gamePlayers[1].health = 150;
        game.attrs.gamePhase = gamePhase;
        return;
    }

    if (gamePhaseType === 'PHASE_BATTLE_RESOLUTION') {
        const gamePhase = {
          id: game.gamePhase.id + 1,
          type: "PHASE_GATHER"
        }
        game.attrs.gamePhase = gamePhase;
        return;
    }
}

export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  this.urlPrefix = 'http://localhost:8080';    // make this `http://localhost:8080`, for example, if your API is on a different server
  this.namespace = '/api/v1';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  this.get('/users/:id');
  this.get('/games/:id');

  this.post('/users', (schema, request) => {
      const name = JSON.parse(request.requestBody).name;
      return schema.users.create({id: 2, name});
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

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.3.x/shorthands/
  */
}
