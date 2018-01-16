import Controller from '@ember/controller';

import {inject} from '@ember/service';

export default Controller.extend({
    game: inject(),

    actions: {
        findGame: function() {
            this.get('game').findGame().then(() => {
                this.transitionToRoute('game')
            });
        }
    }
});
