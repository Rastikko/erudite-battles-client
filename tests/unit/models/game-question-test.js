import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { run } from "@ember/runloop";

module('Unit | Model | game question', function(hooks) {
  setupTest(hooks);

  // Specify the other units that are required for this test.
  test('it exists', function(assert) {
    const model = run(() => this.owner.lookup('service:store').createRecord('game-question'));

    run(() => model.set('turn', 3));

    assert.equal(model.get('turn'), 3);
  });
});
