import Ember from 'ember';
const {isEqual, isPresent} = Ember;

const List = Ember.Object.extend({
  id: null,
  activeItems: Ember.computed( () => Ember.A([]) ),
  allowManyActiveItems: false,
  getItem(itemId) {
    return this.get('activeItems').findBy('id', itemId);
  }
});

const Item = Ember.Object.extend({
  id: null,
  activePanel: null
});

export default Ember.Service.extend({
  registerList(listProperties) {
    this.get('lists').pushObject(List.create(listProperties));
  },
  unregisterList(listId) {
    let lists = this.get('lists');
    let list = lists.findBy('id', listId);
    lists.removeObject(list);
  },
  toggleClick({ listId, itemId, panelName }) {
    let list, activeItems, activeItem;

    list = this.getList(listId);

    activeItems = list.get('activeItems');
    activeItem = list.getItem(itemId);
    if(isPresent(activeItem)) {
      if(isEqual(activeItem.get('activePanel'), panelName)) {
        activeItems.removeObject(activeItem);
      } else {
        activeItem.set('activePanel', panelName);
      }
    } else {
      // If many active items are not allowed clear the activeItems list before adding
      // the new activeItem
      if(!list.get('allowManyActiveItems')) { activeItems.clear(); }

      let newItem = Item.create({ id: itemId, activePanel: panelName });
      activeItems.addObject(newItem);
    }
  },

  getList(listId) {
    let list = this.get('lists').findBy('id', listId);
    return list;
  },

  closeItem(listId, itemId) {
    let list, activeItems, activeItem;

    list = this.getList(listId);
    activeItems = list.get('activeItems');
    activeItem = list.getItem(itemId);
    activeItems.removeObject(activeItem);
  },

  lists: ( () => Ember.A([]))()
});
