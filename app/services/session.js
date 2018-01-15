import Service from '@ember/service';
import {inject} from '@ember/service';

const USER_ID = 2;

export default Service.extend({
    user: null,

    store: inject(),

    init() {
        this._super(...arguments);
        this._handleUserObject = this._handleUserObject.bind(this);
        this.fetch = this.fetch.bind(this);
    },

    fetch: function() {
        return this.get('store').findRecord('user', USER_ID).then(this._handleUserObject).catch(() => {});
    },

    createUser: function(user) {
        const userModel = this.get('store').createRecord('user', user);
        return userModel.save().then(this.fetch);
    },

    setUserGameId(gameId) {
        this.set('model.gameId', gameId);
    },

    _handleUserObject(user) {
        this.set('model', user);
    }
});
