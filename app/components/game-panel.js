import Component from '@ember/component';

import {inject} from '@ember/service';
import {computed} from '@ember/object';

export default Component.extend({
    game: inject(),
    classNames: ['game-panel', 'justify-content-between'],

    endDisabled: computed.not('game.endPhaseReady'),

    actions: {
        endPhase: function() {
            this.get('game').endPhase();
        }
    }
});
