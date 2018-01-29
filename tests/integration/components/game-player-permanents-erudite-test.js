import { moduleForComponent, skip } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('game-player-permanents-erudite', 'Integration | Component | game player permanents erudite', {
  integration: true
});

skip('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{game-player-permanents-erudite}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#game-player-permanents-erudite}}
      template block text
    {{/game-player-permanents-erudite}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
