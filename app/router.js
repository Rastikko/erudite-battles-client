import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('users', function() {
    this.route('create');
  });
  this.route('game', {path: 'game/:id' }, function() {
    this.route('phase', {path: 'phase/:id'});
  });
});

export default Router;
