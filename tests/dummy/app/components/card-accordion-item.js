import layout from '../templates/components/card-accordion-item';
import AccordionItem from 'ember-cli-accordion/components/accordion-item';

export default AccordionItem.extend({
  layout: layout,
  classNames: ["Card"],

  // Inputs
  data: null
});
