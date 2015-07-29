import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';


moduleForComponent('x-accordion-panel', 'Integration | Component | x accordion panel', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{x-accordion-panel}}`);

  assert.equal(this.$().text(), '');

  // Template block usage:
  this.render(hbs`
    {{#x-accordion-panel}}
      template block text
    {{/x-accordion-panel}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
