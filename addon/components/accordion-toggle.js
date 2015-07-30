import Ember from 'ember';
import layout from '../templates/components/accordion-toggle';

export default Ember.Component.extend({
  layout: layout,
  classNameBindings: ['isOpen'],

  // Inputs
  panelName: null,
  accordionItem: null,
  openPanelName: null,

  // Computed Properties
  isOpen: Ember.computed('panelName', 'openPanelName', function() {
    return Ember.isPresent(this.get('panelName')) && Ember.isEqual(this.get('panelName'), this.get('openPanelName'));
  }),

  click: function() {
    this.get('accordionItem').send('togglePanel', this.get('panelName'));
  }
});
