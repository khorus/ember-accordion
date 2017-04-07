import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('home', {path: '/'});
  this.route('blockless');
  this.route('simple-block');
  this.route('nested');
  this.route('multiple-panels');
  this.route('extending');
  this.route('action-curry');
});

export default Router;
