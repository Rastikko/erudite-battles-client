import ApplicationSerializer from './application';
import DS from 'ember-data';

export default ApplicationSerializer.extend(DS.EmbeddedRecordsMixin, {
    attrs: {
        hand: { embedded: 'always' },
        currentGameQuestion: { embedded: 'always'}
    }
});
