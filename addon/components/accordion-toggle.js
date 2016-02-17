import Ember from 'ember';
import ElementActiveState from '../mixins/element-active-state';

const AccordionToggleComponent = Ember.Component.extend(ElementActiveState, {
  accordion: Ember.inject.service('accordion'),
  classNames: ["AccordionToggle"],
  classNameBindings: ['isActive'],

  panelName: 'panel-one',

  click: function() {
    this.get('accordion').toggleClick(this.getProperties('listId', 'itemId', 'panelName'));
    return false;
  }
});

AccordionToggleComponent.reopenClass({
  positionalParams: ['listId', 'itemId']
});

export default AccordionToggleComponent;
