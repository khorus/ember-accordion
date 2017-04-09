import Ember from 'ember';
import layout from '../templates/components/accordion-list';
import Item from '../utils/item';

const { isEqual } = Ember;

const AccordionListComponent = Ember.Component.extend({
  layout,
  classNames: ["AccordionList"],

  // Input params
  allowManyActiveItems: false,

  // Internal state
  _activeItems: null,
  init() {
    this._super(...arguments);
    this.set('_activeItems', Ember.A([]));
  },

  actions: {
    toggleItem(itemId, panelName) {
      console.log("accordion-list#toggleItem");
      const activeItems = this.get('_activeItems');
      const targetItem = activeItems.findBy('id', itemId);

      // if target item is already active
      if(targetItem) {
        // and the panel is already active
        if(isEqual(targetItem.get('panel'), panelName)) {
          activeItems.removeObject(targetItem);
        } else {
          targetItem.set('panel', panelName);
        }
      } else {
        // if simultanious active items are not allow, clear array
        if(!this.get('allowManyActiveItems')) { activeItems.clear(); }

        let newItem = Item.create({ id: itemId, panel: panelName });
        activeItems.addObject(newItem);
      }
    },

    closeItem(itemId) {
      console.log("accordion-list#closeItem");
      let activeItems = this.get('_activeItems');
      const activeItem = activeItems.findBy('id', itemId);
      activeItems.removeObject(activeItem);
    }
  }
});

export default AccordionListComponent;
