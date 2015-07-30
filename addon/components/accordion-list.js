import Ember from 'ember';
import layout from '../templates/components/accordion-list';

export default Ember.Component.extend({
  layout: layout,
  classNames: ["AccordionList"],

  // Inputs
  // setting this true will allow many open panels instead of just one
  allowManyOpenPanels: false,

  // Super weird ember behavior here. If `selectedItems: Ember.A([])` then all instances of
  // component:accordion-list would share the same selectedItems array.
  selectedItems: null,
  onInit: Ember.on('init', function() {
    this.set('selectedItems', Ember.A([]));
  }),

  accordion: Ember.computed( function() { return this; }),

  actions: {
    toggleItem: function(item) {
      console.log(this.toString() + "toggleItem item " + item.elementId);
      var selectedItems = this.get('selectedItems');
      if(selectedItems.contains(item)) {
        selectedItems.removeObject(item);
      } else {
        if( !this.get('allowManyOpenPanels') ) {
          selectedItems.clear();
        }
        selectedItems.addObject(item);
      }
      return false;
    }
  }
});
