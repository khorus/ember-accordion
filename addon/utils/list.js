import Ember from 'ember';

export default Ember.Object.extend({
  id: null,
  activeItems: Ember.computed( () => Ember.A([]) ),
  allowManyActiveItems: false,
  getItem(itemId) {
    return this.get('activeItems').findBy('id', itemId);
  }
});
