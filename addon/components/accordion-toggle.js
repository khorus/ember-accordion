import Ember from 'ember';
import ElementActiveState from '../mixins/element-active-state';

const AccordionToggleComponent = Ember.Component.extend(ElementActiveState, {
  accordion: Ember.inject.service('accordion'),
  classNames: ["AccordionToggle"],
  classNameBindings: ['isActive', 'isDisabled'],

  panelName: 'panel-one',
  isListIdNone: Ember.computed.none('listId'),
  isItemIdNone: Ember.computed.none('itemId'),
  isDisabled: Ember.computed.or('isListIdNone', 'isListIdNone'),

  click: function() {
    if(!this.get('isDisabled')) {
      this.get('accordion').toggleClick(this.getProperties('listId', 'itemId', 'panelName'));
    }
    return false;
  }
});

AccordionToggleComponent.reopenClass({
  positionalParams: ['listId', 'itemId']
});

export default AccordionToggleComponent;
