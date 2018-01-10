import Route from '@ember/routing/route';

import {computed} from '@ember/object';

export default Route.extend({
    user: computed.readOnly('session.model'),

    beforeModel: function() {
        if (this.get('user.gameId')) {
            this.transitionTo('game');
        }
    },
});
