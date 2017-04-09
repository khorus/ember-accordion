import Ember from 'ember';

export default Ember.Controller.extend({
  items: Ember.A([
    { name: 'thing 1', description: 'red suit, blue hair' },
    { name: 'thing 2', description: 'red suit, blue hair too' },
    { name: 'thing 3', description: 'green suit, no hair' }
  ])
});

