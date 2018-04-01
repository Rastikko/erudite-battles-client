import DS from 'ember-data';

import {computed} from '@ember/object';

export default DS.Model.extend({
    gamePhase: DS.belongsTo('gamePhase'),
    gamePlayers: DS.hasMany('gamePlayer', { async: false }),
    sessionUserId: DS.attr('number'),
    turn: DS.attr('number'),

    heroPlayer: computed('sessionUserId', 'gamePlayers.[]', function() {
        const userId = parseInt(this.get('sessionUserId'));
        const heroPlayer = this.get('gamePlayers').find(player => player.get('userId') === userId);
        console.log('heroPlayer!!', heroPlayer);
        return heroPlayer;
    }),

    enemyPlayer: computed('sessionUserId', 'gamePlayers.[]', function() {
        const userId = parseInt(this.get('sessionUserId'));
        return this.get('gamePlayers').find(player => player.get('userId') !== userId);
    })
});
