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

      // Offset the page by one pixel about 250ms later to force rerender in
      // Safari to remove a strange render bug.
      // TODO: Figure out a way to fix this that isn't coupled to a CSS selector.
      Ember.run.later('Accordion Click', function() {
        $('#content').offset({ top: $('#content').offset().top - 1 });
      }, 250);
    }
    return false;
  }
});

AccordionToggleComponent.reopenClass({
  positionalParams: ['listId', 'itemId']
});

export default AccordionToggleComponent;
