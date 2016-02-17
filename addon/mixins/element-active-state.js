import Ember from 'ember';
const { computed, isEqual, isPresent } = Ember;

export default Ember.Mixin.create({
  _list: computed('accordion.lists.[]', function() {
    return this.get('accordion').getList(this.get('listId'));
  }),
  _item: computed('_list.activeItems.[]', function() {
    let list = this.get('_list');
    if(isPresent(list)) {
      return list.getItem(this.get('itemId'));
    }
  }),

  isActive: computed('_item', '_item.activePanel', function() {
    let activePanel = this.get('_item.activePanel');
    return isPresent(activePanel) && isEqual(activePanel, this.get('panelName'));
  })
});
