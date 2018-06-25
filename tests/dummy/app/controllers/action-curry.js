import EmberObject from '@ember/object';
import { A } from '@ember/array';
import Controller from '@ember/controller';

export default Controller.extend({
  items: A([
    EmberObject.create({ name: 'thing 1', value: 'red suit, blue hair' }),
    EmberObject.create({ name: 'thing 2', value: 'red suit, blue hair too' }),
    EmberObject.create({ name: 'thing 3', value: 'green suit, no hair' })
  ]),
  actions: {
    updateName: function(item, newName) {
      item.set('name', newName);
      this.set('newName', '');
    }
  }
});
