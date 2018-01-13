import $ from 'jquery';

import Service from '@ember/service';

import {inject} from '@ember/service';
import {computed} from '@ember/object';
import {once} from '@ember/runloop';

import post from './utils/post';
import objectHandler from './utils/object-handler';

const GAME_API = 'http://localhost:8080/api/v1/games';

export default Service.extend({

    init() {
        this._super(...arguments);
        this.queuedCommands = [];
        this._defineGameModel = this._defineGameModel.bind(this);
    },

    session: inject(),

    user: computed.readOnly('session.model'),

    handledGamePhaseId: -1,

    gamePhaseCommandsRemaining: computed.gt('queuedCommands.length', 0),

    isGamePhaseHandled: computed('handledGamePhase', 'model.gamePhase.id', function() {
        return this.get('handledGamePhase') !== this.get('model.gamePhase.id');
    }),

    endPhaseReady: computed('handledGamePhase', 'model.gamePhase.id', 'queuedCommands.[]', function() {
        if (this.get('isGamePhaseHandled') || !this.get('gamePhaseCommandsRemaining')) {
            return false;
        }
        return true;
    }),

    enemyPlayer: computed('user.id', 'model.gamePlayers.[]', function() {
        const userId = parseInt(this.get('user.id'));
        return this.get('model.gamePlayers').find(player => player.get('userId') !== userId);
    }),

    heroPlayer: computed('user.id', 'model.gamePlayers', function() {
        const userId = parseInt(this.get('user.id'));
        const heroPlayer = this.get('model.gamePlayers').find(player => player.get('userId') === userId);
        return heroPlayer;
    }),

    fetch() {
        if (this.get('model')) {
            return Promise.resolve();
        }
        const gameId = this.get('user.gameId');
        return $.get(`${GAME_API}/${gameId}`).then(this._defineGameModel);
    },

    findGame: function() {
        const userId = this.get('user.id');
        return post(`${GAME_API}/find`, {userId}).then(this._defineGameModel);
    },

    _handleNextCommand() {
        if (this.get('gamePhaseCommandsRemaining')) {
            const nextCommand = this.get('queuedCommands').shiftObject();
            debugger;
            post(`${GAME_API}/commands`, nextCommand).then(gameData => {
                this._defineGameModel(gameData);
                this._handleNextCommand();
            })
        }
    },

    _handleGamePhase() {
        if (this.get('handledGamePhase') === this.get('model.gamePhase.id')) {
            return;
        }

        if (this.get('model.gamePhase.gamePhaseType') === 'PHASE_GATHER') {
            this.get('queuedCommands').pushObject({gameCommandType: 'COMMAND_DRAW', payload: '5', userId: this.get('session.model.id')});
            this.get('queuedCommands').pushObject({gameCommandType: 'COMMAND_HARVEST', payload: '', userId: this.get('session.model.id')});
            this.set('handledGamePhase', this.get('model.gamePhase.id'));
            debugger;
            this._handleNextCommand();
        }

    },

    _defineGameModel: function(game) {
        const gameObject = objectHandler.fromObjectToEmberObject(game);
        this.get('session').setUserGameId(game.id);
        this.set('model', gameObject);
        this._handleGamePhase();
    }
});
