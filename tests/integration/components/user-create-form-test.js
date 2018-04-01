import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | user create form', function(hooks) {
  setupRenderingTest(hooks);

  test('should render correctly', async function(assert) {
    assert.expect(1);

    await render(hbs`{{user-create-form}}`);

    assert.equal(this.element.querySelector('h2').textContent, 'Create account');
  });
});
