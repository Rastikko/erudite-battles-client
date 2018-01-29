import { moduleForComponent, skip } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('game-player-hand', 'Integration | Component | game player hand', {
  integration: true
});

skip('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.set('hand', [{name: 'x'}]);

  // Template block usage:
  this.render(hbs`
    {{#game-player-hand hand=hand}}
    {{/game-player-hand}}
  `);

  assert.notEqual(this.$().text().trim().length, 0);
});
