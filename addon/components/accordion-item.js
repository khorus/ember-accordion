import Ember from 'ember';
const { computed } = Ember;

const AccordionItemComponent = Ember.Component.extend({
  classNames: ["AccordionItem"],

  itemId: computed(function() { return this.elementId; })
});

export default AccordionItemComponent;
