import Route from '@ember/routing/route';

export default Route.extend({
    beforeModel: function() {
        // TODO: this is been called twice
        return this.get('session').fetch();
    },

    afterModel: function() {
        if (!this.get('session.model')) {
            this.transitionTo('users.create');
        } else {
            this.transitionTo('index');
        }
    }
});
