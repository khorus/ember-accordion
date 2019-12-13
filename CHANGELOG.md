# 0.7.0

- Upgrade to Ember 3.14
- Upgrade other dependencies

## Breaking Changes

- Drop Node 6 support

# 0.6.0

- [Feature] yield a hash with open, close, and toggle actions from the toggle component [#16](https://github.com/khorus/ember-accordion/issues/16)
- [Chore] Update circle config settings
- [Chore] Remove the internal use of positional params. These params were not intended to
  be part of the public interface so this should be a non-breaking change for most
  users.

## Breaking Changes

- Drop support for Ember versions < 2.18

# 0.5.0

This is probably the last release before a 1.0.

- [Feature] Added expandAll/collapseAll [#10](https://github.com/khorus/ember-accordion/pull/10)
- [Chore] Upgraded Ember to 3.5

## Breaking Changes

None

# 0.4.0

Transitioned to using contextual components to yield child components
into block context. This allowed a streamlined implementation. State is
no maintained witin `component:accordion-list` rather than an external
service class.

- Dropped support for the blockless form of `component:accordion-list`
  as the blockless implemenation was using an ember api that changed in
  2.x.
- Changed the block form API from yielded id's to yield child
  components.
- Improved test coverage
- Configured ember-try to test a broader range of ember versions

## Upgrading from 0.3.6

The largest change is that `component:accordion-list` and
`component:accordion-item` now yield objects instead of ids. The objects
provide access to the child components and child components no longer
need passed in ids.

This may sound complex, but the upgrade is quite simple.

See this [dummy app
diff](https://github.com/khorus/ember-accordion/compare/ember-2.4?expand=1#diff-270531ff20e72283f337a8db5c233052)
for an example of how to upgrade.

# 0.3.6

Implementation leveraged a service class with yielded list and item id's in order to
manage panel state.
