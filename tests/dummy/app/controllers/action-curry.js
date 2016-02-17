import Ember from 'ember';

export default Ember.Controller.extend({
  items: Ember.A([
    Ember.Object.create({ name: 'thing 1', value: 'red suit, blue hair' }),
    Ember.Object.create({ name: 'thing 2', value: 'red suit, blue hair too' }),
    Ember.Object.create({ name: 'thing 3', value: 'green suit, no hair' })
  ]),
  actions: {
    updateName: function(item, newName) {
      item.set('name', newName);
      this.set('newName', '');
    }
  }
});
