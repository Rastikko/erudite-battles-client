import ApplicationSerializer from './application';

/* eslint-disable no-unused-vars */

export default ApplicationSerializer.extend({
    normalizeResponse(store, primaryModelClass, payload, id, requestType) {

        arguments[2] = {users: payload};
        return this._super(...arguments);
    },
});
