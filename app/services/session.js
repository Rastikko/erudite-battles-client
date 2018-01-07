import Service from '@ember/service';
import $ from 'jquery';

import post from '../helpers/post';

const URL = 'http://localhost:8080/api/v1/users/2';

export default Service.extend({
    user: null,

    fetch: function() {
        if (this.get('user')) {
            return Promise.resolve();
        }
        return $.get(URL).then(this._handleUserLookup.bind(this));
    },

    createUser: function(user) {
        return post('http://localhost:8080/api/v1/users', user);
    },

    _handleUserLookup(data) {
        this.set('user', data);
    }
});
