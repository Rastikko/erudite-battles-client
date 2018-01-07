import Controller from '@ember/controller';

import {computed} from '@ember/object';

export default Controller.extend({
    enemyPlayer: computed('model.gamePlayers', function() {
        return this.get('model.gamePlayers').find(player => player.get('userId') !== this.get('session.model.id'));
    }),

    heroPlayer: computed('model.gamePlayers', function() {
        return this.get('model.gamePlayers').findBy('userId', this.get('session.model.id'));
    })
});
