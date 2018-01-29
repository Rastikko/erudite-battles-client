import { moduleForComponent, skip } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('game-player-permanents', 'Integration | Component | game player permanents', {
  integration: true
});

skip('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  // Template block usage:
  this.render(hbs`
    {{#game-player-permanents}}
    {{/game-player-permanents}}
  `);

  assert.notEqual(this.$().text().trim().length, 0);
});
