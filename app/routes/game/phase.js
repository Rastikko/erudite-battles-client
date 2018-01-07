import Route from '@ember/routing/route';

import {inject} from '@ember/service';

export default Route.extend({
    game: inject(),

    afterModel() {
        this.get('game').handleGamePhase();
    }
});
