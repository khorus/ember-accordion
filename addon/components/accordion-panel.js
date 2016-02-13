import Ember from 'ember';

const AccordionPanelComponent = Ember.Component.extend({
  classNames: ["AccordionPanel"],

  // Inputs
  name: 'panel-one',

  // Computed Properties
  display: Ember.computed('name', 'openPanel', function() {
    console.log(this.toString() + "openPanel: " + this.get('openPanel'));
    return Ember.isEqual(this.get('name'), this.get('openPanel'));
  })
});

AccordionPanelComponent.reopenClass({
  positionalParams: ['openPanel']
});

export default AccordionPanelComponent;
