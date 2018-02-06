import Component from '@ember/component';

import {inject} from '@ember/service';
import {computed} from '@ember/object';

export default Component.extend({
    tagName: 'nav',
    classNames: ['game-player-panel', 'navbar', 'navbar-dark', 'bg-dark'],

    classNameBindings: ['isHeroPlayer:hero-player:enemy-player'],

    game: inject(),

    gamePlayer: computed('isHeroPlayer', 'game.{heroPlayer,enemyPlayer}', function() {
        if (this.get('isHeroPlayer')) {
            return this.get('game.model.heroPlayer');
        }
        return this.get('game.model.enemyPlayer');
    })
});
