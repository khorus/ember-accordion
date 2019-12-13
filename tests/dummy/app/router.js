import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('home', {path: '/'});
  this.route('simple-block');
  this.route('nested');
  this.route('multiple-panels');
  this.route('extending');
  this.route('action-curry');
});
