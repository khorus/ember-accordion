import { A } from '@ember/array';
import Controller from '@ember/controller';

export default Controller.extend({
  items: A([
    { name: 'thing 1', value: 'red suit, blue hair' },
    { name: 'thing 2', value: 'red suit, blue hair too' },
    { name: 'thing 3', value: 'green suit, no hair' }
  ])
});
