import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('user-create-form', 'Integration | Component | user create form', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  // Template block usage:
  this.render(hbs`
    {{#user-create-form}}
      template block text
    {{/user-create-form}}
  `);

  assert.notEqual(this.$().text().trim().length, 0);
});
