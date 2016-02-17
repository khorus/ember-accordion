import Ember from 'ember';

export default Ember.Controller.extend({
  items: Ember.A([
    { name: 'thing 1', color: 'red suit, blue hair' },
    { name: 'thing 2', color: 'red suit, blue hair too' },
    { name: 'thing 3', color: 'green suit, no hair' }
  ])
});
