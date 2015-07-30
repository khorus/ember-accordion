import Ember from 'ember';

export default Ember.Controller.extend({
  items: Ember.A([
    {
      name: 'thing 1',
      children: [
        { name: 'child 1a', value: 'panel for 1a' },
        { name: 'child 1b', value: 'panel for 1b' },
        { name: 'child 1c', value: 'panel for 1c' },
      ]
    },
    {
      name: 'thing 2',
      children: [
        { name: 'child 2a', value: 'panel for 2a' },
        { name: 'child 2b', value: 'panel for 2b' },
        { name: 'child 2c', value: 'panel for 2c' },
      ]
    }
  ])
});
