import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  click,
  find,
  findAll,
  render
} from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | accordion list', function(hooks) {
  setupRenderingTest(hooks);

  test("basic operation", async function(assert) {
    await render(hbs`
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

    assert.equal(findAll('.AccordionToggle').length, 1, 'should render one toggle per item');
    assert.equal(this.$().find('.AccordionToggle').text().trim(), "This is the toggle", 'should render one toggle per item');

    // first click should open the panel
    this.$('.AccordionToggle')[0].click();
    assert.equal(find('.AccordionPanel').textContent.trim(), "This is the panel", "panel should be active");
    assert.equal(findAll('.AccordionPanel.is-active').length, 1, 'panel should have is-active class');

    // second click should close the panel
    this.$('.AccordionToggle')[0].click();
    assert.equal(find('.AccordionPanel').textContent.trim(), "", "panel should not be active");
    assert.equal(findAll('.AccordionPanel.is-active').length, 0, 'panel should not have is-active class');
  });

  test("basic operation with allowManyActiveItems=false", async function(assert) {
    await render(hbs`
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

    await click('.AccordionItem:nth-of-type(1) .AccordionToggle');
    assert.equal(find('.AccordionPanel').textContent.trim(), "panel 1", "after clicking toggle 1, panel 1 should be active");

    await click('.AccordionItem:nth-of-type(2) .AccordionToggle');
    assert.equal(find('.AccordionItem:nth-of-type(2) .AccordionPanel').textContent.trim(), "panel 2", "after clicking toggle 2, panel 2 should be active");
  });

  test("basic operation with allowManyActiveItems=true", async function(assert) {
    await render(hbs`
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

    await click('.AccordionItem:nth-of-type(1) .AccordionToggle');
    assert.equal(find('.AccordionPanel').textContent.trim(), "panel 1", "after clicking toggle 1, panel 1 should be active");

    await click('.AccordionItem:nth-of-type(2) .AccordionToggle');
    assert.equal(find('.AccordionPanel').textContent.trim(), "panel 1", "after clicking toggle 1, panel 1 should be active");
    assert.equal(find('.AccordionItem:nth-of-type(2) .AccordionPanel').textContent.trim(), "panel 2", "after clicking toggle 2, panel 2 should be active");
  });

  test("basic operation with a default open panel", async function(assert) {
    await render(hbs`
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

    assert.equal(find('.AccordionItem:nth-of-type(2) .AccordionPanel').textContent.trim(), "panel 2", "after initial render, panel 2 should be active");
  });

  test("operation with multiple toggle/panel pairs in a single item", async function(assert) {
    await render(hbs`
      {{#accordion-list as |accordion|}}
        {{#accordion.item as |accordionItem|}}
          {{#accordionItem.toggle panelName='one'}}
            toggle 1
          {{/accordionItem.toggle}}
          {{#accordionItem.panel panelName='one'}}
            panel 1
          {{/accordionItem.panel}}

          {{#accordionItem.toggle panelName='two' class='toggle2'}}
            toggle 2
          {{/accordionItem.toggle}}
          {{#accordionItem.panel panelName='two' class='panel2'}}
            panel 2
          {{/accordionItem.panel}}
        {{/accordion.item}}
      {{/accordion-list}}
    `);

    await click('.AccordionItem:nth-of-type(1) .AccordionToggle:nth-of-type(1)');
    assert.equal(find('.AccordionPanel').textContent.trim(), "panel 1", "after clicking on toggle 1, panel 1 should be active");

    await click('.toggle2');
    assert.equal(find('.panel2').textContent.trim(), "panel 2", "after clicking on toggle 2, panel 2 should be active");
  });

  test("curried close action", async function(assert) {
    await render(hbs`
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

    await click('.AccordionItem:nth-of-type(1) .AccordionToggle');
    assert.ok(find('.AccordionItem:nth-of-type(1) .AccordionPanel').textContent.match(/panel 1/), "after clicking toggle 1, panel 1 should be active");

    await click('.AccordionItem:nth-of-type(1) .AccordionPanel button');
    assert.notOk(find('.AccordionItem:nth-of-type(1) .AccordionPanel').textContent.match(/panel 1/), "after clicking close button in panel 1, panel 1 should not be active");
  });

  test("operation with nested accordions", async function(assert) {
    await render(hbs`
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
          {{#accordionItem.panel class='outer-panel-2'}}
            outer panel 2
          {{/accordionItem.panel}}
        {{/accordion.item}}
      {{/accordion-list}}
    `);

    this.$(".AccordionToggle:contains('outer toggle 1')").click();
    assert.ok(find('.AccordionPanel').textContent.match(/outer panel 1/), "after clicking outer toggle 1, outer panel 1 should be active");

    this.$(".AccordionToggle:contains('inner toggle 1')").click();
    assert.ok(find('.AccordionPanel').textContent.match(/inner panel 1/), "after clicking inner toggle 1, inner panel 1 should be active");

    this.$(".AccordionToggle:contains('outer toggle 2')").click();
    assert.ok(find('.outer-panel-2').textContent.match(/outer panel 2/), "after clicking outer toggle 2, outer panel 2 should be active");

    // verify that the active pannel of the inner accordion is reset when panel 1 is reopened
    this.$(".AccordionToggle:contains('outer toggle 1')").click();
    assert.notOk(find('.AccordionPanel').textContent.match(/inner panel 1/), "after reopening outer panel 1, inner panel 1 should not be active");
  });
});
