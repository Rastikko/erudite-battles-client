import Controller from '@ember/controller';

import {inject} from '@ember/service';

export default Controller.extend({
    game: inject(),

    _transitionToGame: function(game) {
        this.transitionToRoute('game', game);
    },

    actions: {
        findGame: function() {
            this.get('game').findGame(this.get('session.model.id')).then(this._transitionToGame.bind(this));
        }
    }
});
