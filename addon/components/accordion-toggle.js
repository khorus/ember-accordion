import Ember from 'ember';

//
// Required Positional Params
// clickHandler
//
// Optional Positional Params
// activePanel
//
// Optional Properties
// panelName
const AccordionToggleComponent = Ember.Component.extend({
  classNames: ["AccordionToggle"],
  classNameBindings: ['isActive'],

  panelName: 'panel-one',

  isActive: Ember.computed('panelName', 'activePanel', function() {
    return Ember.isEqual(this.get('panelName'), this.get('activePanel'));
  }),

  click: function() {
    console.log(this.toString() + "click panelName: " + this.get('panelName'));
    this.get('clickHandler')(this.get('panelName'));
    return false;
  }
});

AccordionToggleComponent.reopenClass({
  positionalParams: ['clickHandler', 'activePanel']
});

export default AccordionToggleComponent;
