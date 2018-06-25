import { notEmpty } from '@ember/object/computed';
import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../templates/components/accordion-item';

const AccordionItemComponent = Component.extend({
  layout,
  classNames: ["AccordionItem"],

  itemId: computed(function() { return this.elementId; }),

  // item is active if there is an item in activeItems matching 'itemId'
  isActive: notEmpty('ownActiveItem'),
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
