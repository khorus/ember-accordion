import Ember from 'ember';
import SetupAccordionServicesInitializer from '../../../initializers/setup-accordion-services';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | setup accordion services', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  SetupAccordionServicesInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
