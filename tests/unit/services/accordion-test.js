import { moduleFor, test } from 'ember-qunit';

moduleFor('service:accordion', 'Unit | Service | accordion');

test('registering and unregistering lists', function(assert) {
  let service = this.subject();
  const listIdA = 'ember123';
  const listIdB = 'ember456';
  assert.equal(service.get('lists.length'), 0, 'list initializes to empty array');
  service.registerList({id: listIdA});
  assert.equal(service.get('lists.length'), 1, 'lists should have 1 list after calling registerList once');
  service.registerList({id: listIdB});
  assert.equal(service.get('lists.length'), 2, 'lists should have 2 lists after registering a new listId');
  service.unregisterList(listIdA);
  service.unregisterList(listIdB);
  assert.equal(service.get('lists.length'), 0, 'lists should have no lists after calling unregisterList');
});

test('getList should return the correct list', function(assert) {
  let service = this.subject();
  const listIdA = 'ember123';
  const listIdB = 'ember456';
  service.registerList({id: listIdA});
  service.registerList({id: listIdB});

  let foundList = service.getList(listIdA);
  assert.equal(foundList.get('id'), listIdA, 'getList should return the correct list');
});

test('toggleClick for list with allowManyActiveItems disabled', function(assert) {
  let service = this.subject();
  let list, item;
  const listIdA = 'ember123';
  const listIdB = 'ember456';
  const itemIdA = 'item123';
  const itemIdB = 'item456';
  const panelName = 'panel-one';
  service.registerList({id: listIdA});
  service.registerList({id: listIdB});

  item = service.getList(listIdA).getItem(itemIdA);
  assert.equal(item, undefined, 'the list should not have an active item by default');

  service.toggleClick({listId: listIdA, itemId: itemIdA, panelName: panelName});

  list = service.getList(listIdA);
  item = list.getItem(itemIdA);
  assert.equal(item.get('id'), itemIdA, 'itemA should be active after toggleClick for itemA');

  // call toggleClick for a different item
  service.toggleClick({listId: listIdA, itemId: itemIdB, panelName: panelName});
  item = list.getItem(itemIdA);
  assert.equal(item, undefined, 'after toggleClick for itemB, itemA should not be in the active item list');
  item = list.getItem(itemIdB);
  assert.equal(item.get('id'), itemIdB, 'after toggleClick for itemB, itemB should be in the active item list');

  service.toggleClick({listId: listIdA, itemId: itemIdB, panelName: panelName});
  item = list.getItem(itemIdB);
  assert.equal(item, undefined, 'after as second toggleClick for itemB, itemB should not be in the active item list');
});

test('toggleClick for list with allowManyActiveItems enabled', function(assert) {
  let service = this.subject();
  let list, item;
  const listIdA = 'ember123';
  const listIdB = 'ember456';
  const itemIdA = 'item123';
  const itemIdB = 'item456';
  const panelName = 'panel-one';
  service.registerList({id: listIdA, allowManyActiveItems: true});
  service.registerList({id: listIdB});

  item = service.getList(listIdA).getItem(itemIdA);
  assert.equal(item, undefined, 'the list should not have an active item by default');

  service.toggleClick({listId: listIdA, itemId: itemIdA, panelName: panelName});

  list = service.getList(listIdA);
  item = list.getItem(itemIdA);
  assert.equal(item.get('id'), itemIdA, 'itemA should be active after toggleClick for itemA');

  // call toggleClick for a different item
  service.toggleClick({listId: listIdA, itemId: itemIdB, panelName: panelName});
  item = list.getItem(itemIdA);
  assert.equal(item.get('id'), itemIdA, 'after toggleClick for itemB, itemA should be in the active item list');
  item = list.getItem(itemIdB);
  assert.equal(item.get('id'), itemIdB, 'after toggleClick for itemB, itemB should be in the active item list');

  service.toggleClick({listId: listIdA, itemId: itemIdB, panelName: panelName});
  item = list.getItem(itemIdA);
  assert.equal(item.get('id'), itemIdA, 'after a second toggleClick for itemB, itemA should be in the active item list');
  item = list.getItem(itemIdB);
  assert.equal(item, undefined, 'after a second toggleClick for itemB, itemB should not be in the active item list');

  // test for case of more than one accordion-list on the page
  service.toggleClick({listId: listIdB, itemId: itemIdA, panelName: panelName});
  item = list.getItem(itemIdA);
  assert.equal(item.get('id'), itemIdA, 'after toggleClick for itemA in listB, itemA in listA should still be in the active item list');
  item = service.getList(listIdB).getItem(itemIdA);
  assert.equal(item.get('id'), itemIdA, 'itemA in listB should be in the active item list');
});
