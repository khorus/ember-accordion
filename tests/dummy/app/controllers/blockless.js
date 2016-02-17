import Ember from 'ember';

export default Ember.Controller.extend({
  items: Ember.A([
    { name: 'thing 1', value: 'red suit, blue hair' },
    { name: 'thing 2', value: 'red suit, blue hair too' },
    { name: 'thing 3', value: 'green suit, no hair' }
  ])
});
