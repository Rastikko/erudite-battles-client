import Component from '@ember/component';

import {inject} from '@ember/service';
import {computed} from '@ember/object';

export default Component.extend({
    game: inject(),

    classNames: ['game-player-permanent-erudite', 'card'],

    classNameBindings: ['isHeroPlayer:hero-player:enemy-player'],

    gamePlayer: computed('isHeroPlayer', 'game.model.{heroPlayer,enemyPlayer}', function() {
        if (this.get('isHeroPlayer')) {
            return this.get('game.model.heroPlayer');
        }
        return this.get('game.model.enemyPlayer');
    })

});
