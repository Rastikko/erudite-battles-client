import { test } from 'qunit';

import moduleForAcceptance from 'erudite-battles-client/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | login');

test('visiting /login', function(assert) {
  server.create('user');
  visit('/users/create');

  andThen(function() {
    assert.equal(currentURL(), '/users/create');
    fillIn('input.login-input', 'Faker');
    click('button.login-btn');
    // little hack to ensure rerender
    visit('/users/create');
    andThen(function() {
        assert.equal(find('div.alert-danger').text().trim(), 'User not found.');
    });
  });
});
