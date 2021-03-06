import Service from '@ember/service';
import {inject} from '@ember/service';

import post from './utils/post';

const LOGIN_API = 'http://localhost:8080/api/v1/users/login';

export default Service.extend({
    user: null,
    loginError: false,

    store: inject(),

    init() {
        this._super(...arguments);
        this._handleUserObject = this._handleUserObject.bind(this);
        this.fetch = this.fetch.bind(this);
    },

    fetch: function() {
        if (!this.get('model.id')) {
          return Promise.resolve();
        }
        // TODO: implement some sort of cookie base authentication
        return this.get('store').findRecord('user', this.get('model.id'), {reload: true}).then(this._handleUserObject).catch(() => {});
    },

    createUser: function(user) {
        const userModel = this.get('store').createRecord('user', user);
        return userModel.save().then(this._handleUserObject);
    },

    login: function(data) {
        return post(LOGIN_API, data).then(this._handleUserObject);
    },

    setUserGameId(gameId) {
        this.set('model.gameId', gameId);
    },

    _handleUserObject(user) {
        this.set('model', user);
    }
});
