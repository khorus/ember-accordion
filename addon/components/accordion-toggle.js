import Ember from 'ember';
import layout from '../templates/components/accordion-toggle';

const AccordionToggleComponent = Ember.Component.extend({
  layout: layout,
  classNames: ["AccordionToggle"],
  classNameBindings: ['isOpen'],

  // Inputs
  panelName: 'panel-one',

  // Computed Properties
  isOpen: Ember.computed('panelName', 'openPanel', function() {
    return Ember.isPresent(this.get('panelName')) && Ember.isEqual(this.get('panelName'), this.get('openPanel'));
  }),

  click: function() {
    console.log(this.toString() + "click panelName: " + this.get('panelName'));
    this.get('togglePanel')(this.get('panelName'));
    return false;
  }
});

AccordionToggleComponent.reopenClass({
  positionalParams: ['openPanel', 'togglePanel']
});

export default AccordionToggleComponent;
