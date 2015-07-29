import Ember from 'ember';
import layout from '../templates/components/x-accordion-panel';

export default Ember.Component.extend({
  layout: layout,

  // Inputs
  name: null,
  openPanelName: null,

  // Computed Properties
  display: Ember.computed('name', 'openPanelName', function() {
    return Ember.isEqual(this.get('name'), this.get('openPanelName'));
  })
});
