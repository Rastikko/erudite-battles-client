import { moduleFor, test } from 'ember-qunit';

moduleFor('route:game', 'Unit | Route | game', {
  // Specify the other units that are required for this test.
  needs: ['service:game']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
