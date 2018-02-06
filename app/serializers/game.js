import ApplicationSerializer from './application';
import DS from 'ember-data';

import { inject as service } from '@ember/service';

/* eslint-disable no-unused-vars */

export default ApplicationSerializer.extend(DS.EmbeddedRecordsMixin, {
    session: service('session'),

    attrs: {
        gamePlayers: { embedded: 'always' },
        gamePhase: { embedded: 'always' }
    },

    normalizeResponse(store, primaryModelClass, payload, id, requestType) {
        payload['sessionUserId'] = this.get('session.model.id');

        arguments[2] = {games: payload};
        return this._super(...arguments);
    },
});
