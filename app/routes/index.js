import Route from '@ember/routing/route';

export default Route.extend({
    beforeModel: function() {
        if (this.get('session.gameId')) {
            this.transitionTo('game', this.get('session.gameId'));
        }
    }
});
