import Ember from 'ember';
import layout from '../templates/components/accordion-list';

export default Ember.Component.extend({
  layout: layout,
  classNames: ["AccordionList"],

  // Inputs
  // setting this true will allow many open panels instead of just one
  allowManyOpenPanels: false,

  // Super weird ember behavior here. If `openItems: Ember.A([])` then all instances of
  // component:accordion-list would share the same openItems array.
  openItems: null,
  onInit: Ember.on('init', function() {
    this.set('openItems', Ember.A([]));
  }),

  accordion: Ember.computed( function() { return this; }),

  actions: {
    toggleItem: function(item) {
      console.log(this.toString() + "toggleItem " + item.toString());
      var openItems = this.get('openItems');
      if(openItems.contains(item)) {
        openItems.removeObject(item);
      } else {
        if( !this.get('allowManyOpenPanels') ) {
          openItems.clear();
        }
        openItems.addObject(item);
      }
      return false;
    }
  }
});
