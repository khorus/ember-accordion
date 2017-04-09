import Ember from 'ember';
import layout from '../templates/components/accordion-item';

const { computed } = Ember;

const AccordionItemComponent = Ember.Component.extend({
  layout,
  classNames: ["AccordionItem"],

  itemId: computed(function() { return this.elementId; }),

  // item is active if there is an item in activeItems matching 'itemId'
  isActive: computed.notEmpty('ownActiveItem'),
  ownActiveItem: computed('activeItems.@each.id', 'itemId', function() {
    return this.get('activeItems').findBy('id', this.get('itemId'));
  }),

  activePanel: computed('isActive', 'ownActiveItem.panel', function() {
    if(!this.get('isActive')) { return null; }

    return this.get('ownActiveItem.panel');
  }),

  actions: {
    togglePanel(panelName) {
      this.get('toggle')(this.get('itemId'), panelName);
    }
  }
});

AccordionItemComponent.reopenClass({
  positionalParams: ['activeItems']
});

export default AccordionItemComponent;
