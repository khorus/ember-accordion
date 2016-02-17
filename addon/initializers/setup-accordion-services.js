import AccordionService from '../services/accordion';

export function initialize(container, application) {
  container.register('service:accordion', AccordionService);
}

export default {
  name: 'setup-accordion-services',
  initialize
};
