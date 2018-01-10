import $ from 'jquery';

import Service from '@ember/service';
import objectHandler from '../helpers/object-handler';

import post from '../helpers/post';

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

    _handleUserObject(user) {
        if (!user) {
            return;
        }
        const userObject = objectHandler.fromObjectToEmberObject(user);
        this.set('model', userObject);
    }
});
