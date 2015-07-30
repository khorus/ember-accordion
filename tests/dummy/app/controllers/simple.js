import Ember from 'ember';

export default Ember.Controller.extend({
  items: Ember.A([
    { name: 'thing 1', color: 'blue' },
    { name: 'thing 2', color: 'red' },
    { name: 'thing 3', color: 'yellow' }
  ])
});
