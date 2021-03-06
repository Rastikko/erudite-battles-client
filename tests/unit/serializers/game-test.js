import { moduleForModel, skip } from 'ember-qunit';

moduleForModel('game', 'Unit | Serializer | game', {
  // Specify the other units that are required for this test.
  needs: ['serializer:game']
});

// Replace this with your real tests.
skip('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
