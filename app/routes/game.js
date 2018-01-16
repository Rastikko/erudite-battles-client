import Route from '@ember/routing/route';
import {inject} from '@ember/service';

export default Route.extend({
    game: inject(),

    model: function() {
        return this.get('game').fetch();
    }
});
