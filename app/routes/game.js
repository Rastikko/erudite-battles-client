import Route from '@ember/routing/route';
import {inject} from '@ember/service';

export default Route.extend({

    game: inject(),

    model: function(params) {
        return this.get('game').fetch(params.id);
    },

    afterModel: function(model) {
        if (model.get('gamePhase.id')) {
            this.transitionTo('game.phase', model.get('gamePhase.id'));
        }
    }
});
