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

    handledGamePhaseId: -1,

    user: computed.readOnly('session.model'),

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

    fetch() {
        let gameId = this.get('user.gameId');
        const sessionPromise = gameId ? Promise.resolve() : this.get('session').fetch();
        sessionPromise.then(() => {
            gameId = this.get('user.gameId');
            return this.get('store').findRecord('game', gameId, {reload: true}).then(this._defineGameModel);
        });
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
            const nextCommand = this.get('queuedCommands').shiftObject();
            post(`${GAME_API}/commands`, nextCommand)
                .then(this.fetch)
                .then(this._handleNextCommand)
        }
    },

    _defineGameModel: function(game) {
        if (!this.get('model')) {
            this.set('model', game);
        }
        this._handleGamePhase();
    }
});
