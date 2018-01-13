import $ from 'jquery';

import Service from '@ember/service';

import post from './utils/post';
import objectHandler from './utils/object-handler';

const URL = 'http://localhost:8080/api/v1/users/2';

export default Service.extend({
    user: null,

    fetch: function() {
        if (this.get('model')) {
            return Promise.resolve();
        }
        return $.get(URL).then(this._handleUserObject.bind(this));
    },

    createUser: function(user) {
        return post('http://localhost:8080/api/v1/users', user).then(this._handleUserObject.bind(this));
    },

    setUserGameId(gameId) {
        this.set('model.gameId', gameId);
    },

    _handleUserObject(user) {
        if (!user) {
            return;
        }
        const userObject = objectHandler.fromObjectToEmberObject(user);
        this.set('model', userObject);
    }
});
