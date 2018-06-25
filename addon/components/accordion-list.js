import Ember from 'ember';
import layout from '../templates/components/accordion-list';
import Item from '../utils/item';

const { isEqual, computed, isNone } = Ember;

const AccordionListComponent = Ember.Component.extend({
  layout,
  classNames: ["AccordionList"],

  // Input params
  allowManyActiveItems: false,

  // Internal state
  _activeItems: null,
  _registeredItems: null,
  init() {
    this._super(...arguments);
    this.set('_activeItems', Ember.A([]));
    this.set('_registeredItems', Ember.A([]));
  },

  // If each registered item has at least on panel open, then return true
  allExpanded: computed('_activeItems.[]', '_registeredItems.[]', function() {
    let { _activeItems, _registeredItems } = this.getProperties('_activeItems', '_registeredItems');

    for (let i=0; i < _registeredItems.length; i++) {
      if (isNone(_activeItems.findBy('id', _registeredItems[i].itemId))) {
        return false;
      }
    }

    return true;
  }),

  actions: {
    toggleItem(itemId, panelName) {
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
      let activeItems = this.get('_activeItems');
      const activeItem = activeItems.findBy('id', itemId);
      activeItems.removeObject(activeItem);
    },

    expandAll(panelName) {
      panelName = panelName || 'panel-one';
      let { _activeItems, _registeredItems } = this.getProperties('_activeItems', '_registeredItems');
      _registeredItems.forEach(registeredItem => {
        if (registeredItem.panelName === panelName) {
          _activeItems.addObject(Item.create({id: registeredItem.itemId, panel: panelName}));
        }
      });
    },

    collapseAll() {
      this.get('_activeItems').clear();
    },

    // private action, allow panel's to register themselves so they can participate in expand/collapse all
    register(itemId, panelName) {
      this.get('_registeredItems').addObject({itemId, panelName});
    },

    // private action
    unregister(itemId, panelName) {
      this.get('_registeredItems').removeObject({itemId, panelName});
    },
  }
});

export default AccordionListComponent;
