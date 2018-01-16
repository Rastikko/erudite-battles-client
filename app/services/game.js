import Service from '@ember/service';

import {inject} from '@ember/service';
import {computed} from '@ember/object';

import post from './utils/post';

const GAME_API = 'http://localhost:8080/api/v1/games';

export default Service.extend({

    init() {
        this._super(...arguments);
        this.queuedCommands = [];

        this.fetch = this.fetch.bind(this);
        this._defineGameModel = this._defineGameModel.bind(this);
        this._handleNextCommand = this._handleNextCommand.bind(this);

        this.get('animator').on('animationsEnded', this._handleNextCommand);
    },

    store: inject(),
    session: inject(),
    animator: inject(),

    user: computed.readOnly('session.model'),

    handledGamePhaseId: -1,

    gamePhaseCommandsRemaining: computed.gt('queuedCommands.length', 0),

    isGamePhaseHandled: computed('handledGamePhase', 'model.gamePhase.id', function() {
        return this.get('handledGamePhase') === this.get('model.gamePhase.id');
    }),

    endPhaseReady: computed('isGamePhaseHandled', 'gamePhaseCommandsRemaining', function() {
        if (!this.get('isGamePhaseHandled') || this.get('gamePhaseCommandsRemaining')) {
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
        const gameId = this.get('user.gameId');
        return this.get('store').findRecord('game', gameId, {reload: true}).then(this._defineGameModel);
        // return $.get(`${GAME_API}/${gameId}`).then(this._defineGameModel);
    },

    findGame: function() {
        const userId = this.get('user.id');
        return post(`${GAME_API}/find`, {userId}).then(this.get('session').fetch);
    },

    endPhase: function() {
        this.get('queuedCommands').pushObject({type: 'COMMAND_END', payload: '', userId: this.get('session.model.id')});
        this._handleNextCommand();
    },

    _handleGamePhase() {
        if (this.get('isGamePhaseHandled')) {
            return;
        }

        if (this.get('model.gamePhase.type') === 'PHASE_GATHER') {
            this.get('queuedCommands').pushObject({type: 'COMMAND_DRAW', payload: '5', userId: this.get('session.model.id')});
            this.get('queuedCommands').pushObject({type: 'COMMAND_HARVEST', payload: '', userId: this.get('session.model.id')});
            this.get('queuedCommands').pushObject({type: 'COMMAND_END', payload: '', userId: this.get('session.model.id')});
            this._handleNextCommand();
        }

        if (this.get('model.gamePhase.type') === 'PHASE_OUTCOME') {
            alert('GAME OVER');
        }

        this.set('handledGamePhase', this.get('model.gamePhase.id'));
    },

    _handleNextCommand() {
        if (this.get('gamePhaseCommandsRemaining') && !this.get('animator.isAnimating')) {
            const nextCommand = this.get('queuedCommands.0');
            post(`${GAME_API}/commands`, nextCommand)
            .then(() => {
                this.get('queuedCommands').shiftObject();
            })
            .then(this.fetch)
            .then(this._handleNextCommand)
        }
    },

    _defineGameModel: function(game) {
        // const gameObject = objectHandler.fromObjectToEmberObject(game);
        if (!this.get('model')) {
            this.set('model', game);
        }
        this._handleGamePhase();
    }
});
