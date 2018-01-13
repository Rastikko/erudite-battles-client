import { moduleFor, test } from 'ember-qunit';
import EmberObject from '@ember/object';

moduleFor('service:game', 'Unit | Service | game', {
  // Specify the other units that are required for this test.
  needs: ['service:session']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let service = this.subject();
  assert.ok(service);
});

test('_handleGamePhase', function(assert) {
    let service = this.subject();
    const sessionModel = EmberObject.create({id: 1});
    const gamePhase = EmberObject.create({gamePhaseType: 'PHASE_GATHER', id: 1});
    const gameModel = EmberObject.create({gamePhase: gamePhase});
    service.set('session.model', sessionModel);
    service.set('model', gameModel);

    service._handleGamePhase();

    assert.equal(service.get('queuedCommands.length'), 2);
    assert.equal(service.get('queuedCommands.0.userId'), 1);
    assert.equal(service.get('queuedCommands.0.gameCommandType'), 'COMMAND_DRAW');
    assert.equal(service.get('queuedCommands.0.payload'), '5');
    assert.equal(service.get('queuedCommands.1.gameCommandType'), 'COMMAND_HARVEST');
    assert.equal(service.get('queuedCommands.1.payload'), '');
    assert.equal(service.get('handledGamePhase'), 1);
})
