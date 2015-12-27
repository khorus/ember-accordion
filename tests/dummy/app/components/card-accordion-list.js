import layout from '../templates/components/card-accordion-list';
import AccordionList from 'ember-cli-accordion/components/accordion-list';

export default AccordionList.extend({
  layout: layout,
  classNames: ["CardList"],

  // Inputs
  cards: []
});
