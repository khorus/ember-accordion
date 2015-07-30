import Ember from 'ember';
import layout from '../templates/components/accordion-panel';

export default Ember.Component.extend({
  layout: layout,
  classNames: ["AccordionPanel"],

  // Inputs
  name: 'panel-one',
  accordionItem: null,

  // Computed Properties
  display: Ember.computed('name', 'accordionItem.openPanelName', function() {
    //console.log(this.toString() + "display accordionItem id: " +this.get('accordionItem').elementId+ " openPanelName: " + this.get('accordionItem.openPanelName'));
    return Ember.isEqual(this.get('name'), this.get('accordionItem.openPanelName'));
  })
});
