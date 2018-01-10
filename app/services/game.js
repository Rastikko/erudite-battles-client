import $ from 'jquery';

import Service from '@ember/service';

import post from '../helpers/post';
import objectHandler from '../helpers/object-handler';

import {inject} from '@ember/service';
import {computed} from '@ember/object';

const GAME_API = 'http://localhost:8080/api/v1/games';

export default Service.extend({

    session: inject(),

    user: computed.readOnly('session.model'),

    enemyPlayer: computed('user.id', 'model.gamePlayers.[]', function() {
        const userId = this.get('user.id');
        return this.get('model.gamePlayers').find(player => player.get('userId') !== userId);
    }),

    heroPlayer: computed('user.id', 'model.gamePlayers', function() {
        const userId = this.get('user.id');
        return this.get('model.gamePlayers').findBy('userId', userId);
    }),

    fetch() {
        if (this.get('model')) {
            return Promise.resolve();
        }
        const gameId = this.get('user.gameId');
        return $.get(`${GAME_API}/${gameId}`).then(this._handleGameObject.bind(this));
    },

    findGame: function() {
        const userId = this.get('user.id');
        return post(`${GAME_API}/find`, {userId}).then(this._handleGameObject.bind(this));
    },

    handleGamePhase: function() {
        // console.log('handleGamePhase: ', this.get('model'));
        // in between commands i need to give a change to handle animations
        // one phase might have multiple automatic commands
        // one phase might finish automaticallyv c
    },

    _handleGameObject: function(game) {
        const gameObject = objectHandler.fromObjectToEmberObject(game);
        this.set('model', gameObject);
    }
});
