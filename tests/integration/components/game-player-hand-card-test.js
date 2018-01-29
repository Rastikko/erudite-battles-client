import { moduleForComponent, skip } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('game-player-hand-card', 'Integration | Component | game player hand card', {
  integration: true
});

skip('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{game-player-hand-card}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#game-player-hand-card}}
      template block text
    {{/game-player-hand-card}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
