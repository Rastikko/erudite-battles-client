import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { run } from "@ember/runloop";

module('Unit | Model | game player', function(hooks) {
  setupTest(hooks);

  // Specify the other units that are required for this test.
  test('it exists', function(assert) {
    const player = run(() => this.owner.lookup('service:store').createRecord('game-player'));

    run(() => player.set('energy', 2));


    assert.equal(player.get('energy'), 2, 'the energy does match');
  });
});
