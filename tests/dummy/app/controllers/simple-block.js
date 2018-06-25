import { A } from '@ember/array';
import Controller from '@ember/controller';

export default Controller.extend({
  items: A([
    { name: 'thing 1', description: 'red suit, blue hair' },
    { name: 'thing 2', description: 'red suit, blue hair too' },
    { name: 'thing 3', description: 'green suit, no hair' }
  ])
});

