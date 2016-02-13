import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ["AccordionList"],

  // Inputs
  // setting this true will allow many active items instead of just one
  allowManyActiveItems: false,

  // Super weird ember behavior here. If `activeItems: Ember.A([])` then all instances of
  // component:accordion-list would share the same activeItems array.
  activeItems: null,
  onInit: Ember.on('init', function() {
    this.set('activeItems', Ember.A([]));
  }),

  accordion: Ember.computed( function() { return this; }),

  actions: {
    clickHandler: function(item) {
      console.log(this.toString() + "clickHandler " + item.toString());
      var activeItems = this.get('activeItems');
      if(activeItems.contains(item)) {
        activeItems.removeObject(item);
      } else {
        if( !this.get('allowManyActiveItems') ) {
          activeItems.clear();
        }
        activeItems.addObject(item);
      }
      return false;
    }
  }
});
