import Ember from 'ember';
const { inject, computed } = Ember;

const AccordionListComponent = Ember.Component.extend({
  accordion: inject.service('accordion'),
  classNames: ["AccordionList"],

  allowManyActiveItems: false,
  listId: computed(function() { return this.elementId; }),

  didInsertElement() {
    this._super(...arguments);
    Ember.run.scheduleOnce('afterRender', this, '_registerAccordion');
  },
  _registerAccordion() {
    this.get('accordion').registerList({id: this.get('listId'), allowManyActiveItems: this.get('allowManyActiveItems')});
  },
  willDestroyElement() {
    this._super(...arguments);
    this.get('accordion').unregisterList(this.get('listId'));
  },

  actions: {
    closeItem: function(itemId) {
      this.get('accordion').closeItem(this.get('listId'), itemId);
    }
  }
});

AccordionListComponent.reopenClass({
  positionalParams: ['items', 'toggleTemplate', 'panelTemplate']
});

export default AccordionListComponent;
