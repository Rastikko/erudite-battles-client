import Component from '@ember/component';

export default Component.extend({
    tagName: 'form',

    actions: {
        createUser: function() {
            this.get('session').createUser({
                name: this.get('userName')
            }).then(() => {
                this.get('userCreated')();
            });
        }
    }
});
