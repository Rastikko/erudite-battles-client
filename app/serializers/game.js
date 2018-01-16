import ApplicationSerializer from './application';
import DS from 'ember-data';

/* eslint-disable no-unused-vars */

export default ApplicationSerializer.extend(DS.EmbeddedRecordsMixin, {
    attrs: {
        gamePlayers: { embedded: 'always' },
        gamePhase: { embedded: 'always' }
    },

    normalizeResponse(store, primaryModelClass, payload, id, requestType) {
        arguments[2] = {games: payload};
        return this._super(...arguments);
    },
});
