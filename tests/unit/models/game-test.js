import { moduleForModel, test } from 'ember-qunit';
import { run } from '@ember/runloop';

moduleForModel('game', 'Unit | Model | game', {
  // Specify the other units that are required for this test.
  needs: ['model:gamePlayer']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

test('heroPlayer retrieves the player where userId matches the session', function(assert) {
    const store = this.store();
    const done = assert.async();

    run(() => {
        const gamePlayers = [store.createRecord('gamePlayer', {userId: 111}), store.createRecord('game-player', {userId: 222})];
        const sessionUserId = 111;
        const model = this.subject({ gamePlayers, sessionUserId });
        assert.equal(111, model.get('heroPlayer.userId'));
        assert.equal(222, model.get('enemyPlayer.userId'));
        done();
    });
});
