import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import AccordionService from 'ember-accordion/services/accordion';

const MockedAccordionService = AccordionService.extend({});

moduleForComponent('accordion-list', 'Integration | Component | accordion list', {
  integration: true,
  beforeEach: function() {
    this.container.register('service:accordionMock', MockedAccordionService);
    this.container.injection('component', 'accordion', 'service:accordionMock');
  }
});

test('noop', function(assert) {
  assert.ok(true);
});

test('blockless form', function(assert) {
  assert.expect(4);
  let items = [
    { name: 'thing one', value: 'red shirt' },
    { name: 'thing two', value: 'red shirt too' }
  ];
  this.set('items', items);

  // had to mock this or service:accordion#lists is null when unregisteredList
  // is called
  this.container.lookup('service:accordionMock').unregisterList = () => {
    assert.ok(true, 'should call unregisterList');
  };

  this.render(hbs`{{accordion-list items 'accordion-elements/toggle' 'accordion-elements/panel'}}`);
  assert.equal(this.$('.AccordionToggle').length, 2, 'should render one toggle per item');

  // first click should open the panel
  this.$('.AccordionToggle')[0].click();
  assert.equal(this.$().find('.AccordionPanel').text().trim(), items[0].value, "panel should be active");

  // second click should close the panel
  this.$('.AccordionToggle')[0].click();
  assert.equal(this.$().find('.AccordionPanel').text().trim(), "", "panel should not be active");
});
//
//test("block form", function(assert) {
//  assert.expect(5);
//
//  this.container.lookup('service:accordionMock').unregisterList = () => {
//    assert.ok(true, 'should call unregisterList');
//  };
//
//  this.render(hbs`
//    {{#accordion-list as |listId|}}
//      {{#accordion-item as |itemId|}}
//        <p>content in the item</p>
//        {{#accordion-toggle listId itemId}}
//          This is the toggle
//        {{/accordion-toggle}}
//        {{#accordion-panel listId itemId}}
//          This is the panel
//        {{/accordion-panel}}
//      {{/accordion-item}}
//    {{/accordion-list}}
//  `);
//
//  assert.equal(this.$('.AccordionToggle').length, 1, 'should render one toggle per item');
//  assert.equal(this.$().find('.AccordionToggle').text().trim(), "This is the toggle", 'should render one toggle per item');
//
//  // first click should open the panel
//  this.$('.AccordionToggle')[0].click();
//  assert.equal(this.$().find('.AccordionPanel').text().trim(), "This is the panel", "panel should be active");
//
//  // second click should close the panel
//  this.$('.AccordionToggle')[0].click();
//  assert.equal(this.$().find('.AccordionPanel').text().trim(), "", "panel should not be active");
//});
