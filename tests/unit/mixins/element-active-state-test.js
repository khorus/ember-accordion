import Ember from 'ember';
import ElementActiveStateMixin from '../../../mixins/element-active-state';
import { module, test } from 'qunit';

module('Unit | Mixin | element active state');

// Replace this with your real tests.
test('it works', function(assert) {
  let ElementActiveStateObject = Ember.Object.extend(ElementActiveStateMixin);
  let subject = ElementActiveStateObject.create();
  assert.ok(subject);
});
