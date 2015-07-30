import Ember from 'ember';
import layout from '../templates/components/accordion-list';

export default Ember.Component.extend({
  layout: layout,

  // Inputs
  // setting this true will allow many open panels instead of just one
  allowManyOpenPanels: false,

  selectedItems: Ember.A([]),

  actions: {
    toggleItem: function(item) {
      var selectedItems = this.get('selectedItems');
      if(selectedItems.contains(item)) {
        selectedItems.removeObject(item);
      } else {
        if( !this.get('allowManyOpenPanels') ) {
          selectedItems.clear();
        }
        selectedItems.addObject(item);
      }
    }
  }
});
