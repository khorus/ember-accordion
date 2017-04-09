import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('accordion-list', 'Integration | Component | accordion list', {
  integration: true,
});

test("basic operation", function(assert) {
  this.render(hbs`
    {{#accordion-list as |accordion|}}
      {{#accordion.item as |accordionItem|}}
        <p>content in the item</p>
        {{#accordionItem.toggle}}
          This is the toggle
        {{/accordionItem.toggle}}
        {{#accordionItem.panel}}
          This is the panel
        {{/accordionItem.panel}}
      {{/accordion.item}}
    {{/accordion-list}}
  `);

  assert.equal(this.$('.AccordionToggle').length, 1, 'should render one toggle per item');
  assert.equal(this.$().find('.AccordionToggle').text().trim(), "This is the toggle", 'should render one toggle per item');

  // first click should open the panel
  this.$('.AccordionToggle')[0].click();
  assert.equal(this.$('.AccordionPanel').text().trim(), "This is the panel", "panel should be active");
  assert.equal(this.$('.AccordionPanel.is-active').length, 1, 'panel should have is-active class');

  // second click should close the panel
  this.$('.AccordionToggle')[0].click();
  assert.equal(this.$('.AccordionPanel').text().trim(), "", "panel should not be active");
  assert.equal(this.$('.AccordionPanel.is-active').length, 0, 'panel should not have is-active class');
});

test("basic operation with allowManyActiveItems=false", function(assert) {
  this.render(hbs`
    {{#accordion-list as |accordion|}}
      {{#accordion.item as |accordionItem|}}
        {{#accordionItem.toggle}}
          toggle 1
        {{/accordionItem.toggle}}
        {{#accordionItem.panel}}
          panel 1
        {{/accordionItem.panel}}
      {{/accordion.item}}

      {{#accordion.item as |accordionItem|}}
        {{#accordionItem.toggle}}
          toggle 2
        {{/accordionItem.toggle}}
        {{#accordionItem.panel}}
          panel 2
        {{/accordionItem.panel}}
      {{/accordion.item}}
    {{/accordion-list}}
  `);

  this.$('.AccordionToggle')[0].click();
  assert.equal(this.$('.AccordionPanel').text().trim(), "panel 1", "after clicking toggle 1, panel 1 should be active");

  this.$('.AccordionToggle')[1].click();
  assert.equal(this.$('.AccordionPanel').text().trim(), "panel 2", "after clicking toggle 2, panel 2 should be active");
});

test("basic operation with allowManyActiveItems=true", function(assert) {
  this.render(hbs`
    {{#accordion-list allowManyActiveItems=true as |accordion|}}
      {{#accordion.item as |accordionItem|}}
        {{#accordionItem.toggle}}
          toggle 1
        {{/accordionItem.toggle}}
        {{#accordionItem.panel}}
          panel 1
        {{/accordionItem.panel}}
      {{/accordion.item}}

      {{#accordion.item as |accordionItem|}}
        {{#accordionItem.toggle}}
          toggle 2
        {{/accordionItem.toggle}}
        {{#accordionItem.panel}}
          panel 2
        {{/accordionItem.panel}}
      {{/accordion.item}}
    {{/accordion-list}}
  `);

  this.$('.AccordionToggle')[0].click();
  assert.equal(this.$('.AccordionPanel').text().trim(), "panel 1", "after clicking toggle 1, panel 1 should be active");

  this.$('.AccordionToggle')[1].click();
  assert.ok(this.$('.AccordionPanel').text().match(/panel 1\s+panel 2/), "after clicking toggle 2, both panels should be active");
});

test("basic operation with a default open panel", function(assert) {
  this.render(hbs`
    {{#accordion-list as |accordion|}}
      {{#accordion.item as |accordionItem|}}
        {{#accordionItem.toggle}}
          toggle 1
        {{/accordionItem.toggle}}
        {{#accordionItem.panel}}
          panel 1
        {{/accordionItem.panel}}
      {{/accordion.item}}

      {{#accordion.item as |accordionItem|}}
        {{#accordionItem.toggle}}
          toggle 2
        {{/accordionItem.toggle}}
        {{#accordionItem.panel openOnInit=true}}
          panel 2
        {{/accordionItem.panel}}
      {{/accordion.item}}
    {{/accordion-list}}
  `);

  this.$('.AccordionToggle')[1].click();
  assert.equal(this.$('.AccordionPanel').text().trim(), "panel 2", "after initial render, panel 2 should be active");
});

test("operation with multiple toggle/panel pairs in a single item", function(assert) {
  this.render(hbs`
    {{#accordion-list as |accordion|}}
      {{#accordion.item as |accordionItem|}}
        {{#accordionItem.toggle panelName='one'}}
          toggle 1
        {{/accordionItem.toggle}}
        {{#accordionItem.panel panelName='one'}}
          panel 1
        {{/accordionItem.panel}}

        {{#accordionItem.toggle panelName='two'}}
          toggle 2
        {{/accordionItem.toggle}}
        {{#accordionItem.panel panelName='two'}}
          panel 2
        {{/accordionItem.panel}}
      {{/accordion.item}}
    {{/accordion-list}}
  `);

  this.$('.AccordionToggle')[0].click();
  assert.equal(this.$('.AccordionPanel').text().trim(), "panel 1", "after clicking on toggle 1, panel 1 should be active");

  this.$('.AccordionToggle')[1].click();
  assert.equal(this.$('.AccordionPanel').text().trim(), "panel 2", "after clicking on toggle 2, panel 2 should be active");
});

test("curried close action", function(assert) {
  this.render(hbs`
    {{#accordion-list as |accordion|}}
      {{#accordion.item as |accordionItem|}}
        {{#accordionItem.toggle}}
          toggle 1
        {{/accordionItem.toggle}}
        {{#accordionItem.panel}}
          panel 1
          <button {{action accordionItem.close}}>
            Close Item
          </button>
        {{/accordionItem.panel}}
      {{/accordion.item}}
    {{/accordion-list}}
  `);

  this.$('.AccordionToggle')[0].click();
  assert.ok(this.$('.AccordionPanel').text().match(/panel 1/), "after clicking toggle 1, panel 1 should be active");

  this.$('.AccordionPanel button')[0].click();
  assert.notOk(this.$('.AccordionPanel').text().match(/panel 1/), "after clicking close button in panel 1, panel 1 should not be active");
});

test("operation with nested accordions", function(assert) {
  this.render(hbs`
    {{#accordion-list as |accordion|}}
      {{#accordion.item as |accordionItem|}}
        {{#accordionItem.toggle}}
          outer toggle 1
        {{/accordionItem.toggle}}
        {{#accordionItem.panel}}
          outer panel 1

          {{#accordion-list as |accordionInner|}}
            {{#accordionInner.item as |accordionInnerItem|}}
              {{#accordionInnerItem.toggle}}
                inner toggle 1
              {{/accordionInnerItem.toggle}}
              {{#accordionInnerItem.panel}}
                inner panel 1
              {{/accordionInnerItem.panel}}
            {{/accordionInner.item}}

            {{#accordionInner.item as |accordionInnerItem|}}
              {{#accordionInnerItem.toggle}}
                inner toggle 2
              {{/accordionInnerItem.toggle}}
              {{#accordionInnerItem.panel}}
                inner panel 2
              {{/accordionInnerItem.panel}}
            {{/accordionInner.item}}
          {{/accordion-list}}

        {{/accordionItem.panel}}
      {{/accordion.item}}

      {{#accordion.item as |accordionItem|}}
        {{#accordionItem.toggle}}
          outer toggle 2
        {{/accordionItem.toggle}}
        {{#accordionItem.panel}}
          outer panel 2
        {{/accordionItem.panel}}
      {{/accordion.item}}
    {{/accordion-list}}
  `);

  this.$(".AccordionToggle:contains('outer toggle 1')").click();
  assert.ok(this.$('.AccordionPanel').text().match(/outer panel 1/), "after clicking outer toggle 1, outer panel 1 should be active");

  this.$(".AccordionToggle:contains('inner toggle 1')").click();
  assert.ok(this.$('.AccordionPanel').text().match(/inner panel 1/), "after clicking inner toggle 1, inner panel 1 should be active");

  this.$(".AccordionToggle:contains('outer toggle 2')").click();
  assert.ok(this.$('.AccordionPanel').text().match(/outer panel 2/), "after clicking outer toggle 2, outer panel 2 should be active");

  // verify that the active pannel of the inner accordion is reset when panel 1 is reopened
  this.$(".AccordionToggle:contains('outer toggle 1')").click();
  assert.notOk(this.$('.AccordionPanel').text().match(/inner panel 1/), "after reopening outer panel 1, inner panel 1 should not be active");
});
