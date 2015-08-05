import Ember from 'ember';
import layout from '../templates/components/accordion-toggle';

export default Ember.Component.extend({
  layout: layout,
  tagName: 'span',
  classNames: ["AccordionToggle"],
  classNameBindings: ['isOpen'],

  // Inputs
  panelName: 'panel-one',
  accordionItem: null,

  // Computed Properties
  isOpen: Ember.computed('panelName', 'accordionItem.openPanelName', function() {
    return Ember.isPresent(this.get('panelName')) && Ember.isEqual(this.get('panelName'), this.get('accordionItem.openPanelName'));
  }),

  click: function() {
    //console.log(this.toString() + "click panelName: " + this.get('panelName'));
    if(Ember.isPresent(this.get('acccordionItem'))) {
      this.get('accordionItem').send('togglePanel', this.get('panelName'));
      return false;
    } else {
      console.log("No accordion-item detected for " + this.toString() + ", not sending togglePanel action");
    }
  }
});
