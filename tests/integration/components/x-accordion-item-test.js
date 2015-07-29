import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';


moduleForComponent('x-accordion-item', 'Integration | Component | x accordion item', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{x-accordion-item}}`);

  assert.equal(this.$().text(), '');

  // Template block usage:
  this.render(hbs`
    {{#x-accordion-item}}
      template block text
    {{/x-accordion-item}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
