import Ember from 'ember';
import layout from '../templates/components/accordion-panel';

const AccordionPanelComponent = Ember.Component.extend({
  layout: layout,
  classNames: ["AccordionPanel"],

  // Inputs
  name: 'panel-one',

  // Computed Properties
  display: Ember.computed('name', 'openPanel', function() {
    console.log(this.toString() + "openPanel: " + this.get('openPanel'));
    return Ember.isEqual(this.get('name'), this.get('openPanel'));
  })
});

AccordionPanelComponent.reopen({
  positionalParams: ['openPanel']
});

export default AccordionPanelComponent;
