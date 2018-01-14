import Component from '@ember/component';

import {inject} from '@ember/service';
import {computed} from '@ember/object';

export default Component.extend({
    game: inject(),

    classNames: ['game-player-permanent-erudite', 'card'],

    classNameBindings: ['isHeroPlayer:hero-player:enemy-player'],

    gamePlayer: computed('isHeroPlayer', 'game.{heroPlayer,enemyPlayer}', function() {
        if (this.get('isHeroPlayer')) {
            return this.get('game.heroPlayer');
        }
        return this.get('game.enemyPlayer');
    })

});
