import Controller from '@ember/controller';

export default Controller.extend({
    actions: {
        userCreated: function() {
            this.transitionToRoute('index');
        }
    }
});
