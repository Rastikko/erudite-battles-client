import Component from '@ember/component';

export default Component.extend({
    error: false,

    actions: {
        login: function() {
            this.get('session').login({
                name: this.get('userName')
            }).then(() => {
                this.get('userCreated')();
            }).catch(() => {
                this.set('error', true);
            });
        }
    }
});
