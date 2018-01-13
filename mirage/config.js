/* eslint-disable no-unused-vars */

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
    const game = schema.games.find(1);
    const newCard = game.attrs.gamePlayers[1].deck.pop();
    game.attrs.gamePlayers[1].hand.push(newCard);
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
