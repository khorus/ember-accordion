import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';


moduleForComponent('accordion-toggle', 'Integration | Component | accordion toggle', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{accordion-toggle}}`);

  assert.equal(this.$().text(), '');

  // Template block usage:
  this.render(hbs`
    {{#accordion-toggle}}
      template block text
    {{/accordion-toggle}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
