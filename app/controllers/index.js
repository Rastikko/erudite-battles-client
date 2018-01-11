import Controller from '@ember/controller';

import {inject} from '@ember/service';

export default Controller.extend({
    game: inject(),

    _transitionToGame: function() {
        this.transitionToRoute('game');
    },

    actions: {
        findGame: function() {
            this.get('game').findGame().then(this._transitionToGame.bind(this));
        }
    }
});
