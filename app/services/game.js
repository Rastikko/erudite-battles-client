import $ from 'jquery';

import Service from '@ember/service';

import post from '../helpers/post';
import objectHandler from '../helpers/object-handler';

export default Service.extend({

    fetch(gameId) {
        return $.get(`http://localhost:8080/api/v1/games/${gameId}`).then(this._handleGameObject.bind(this));
    },

    findGame: function(userId) {
        return post('http://localhost:8080/api/v1/games/find', {userId}).then(this._handleGameObject.bind(this));
    },

    handleGamePhase: function() {
        // in between commands i need to give a change to handle animations
        // one phase might have multiple automatic commands
        // one phase might finish automaticallyv c
    },

    _handleGameObject: function(game) {
        const gameObject = objectHandler.fromObjectToEmberObject(game);

        this.set('model', gameObject);

        return gameObject;
    }
});
