import Ember from 'ember';
import layout from '../templates/components/accordion-item';

export default Ember.Component.extend({
  layout: layout,

  // Inputs
  parentAccordion: null,
  selectedItems: [],
  defaultOpenPanelName: null,

  openPanelName: null,
  closePanelWhenNotSelected: function() {
    if( !this.get('selectedItems').contains(this) ) {
      this.set('openPanelName', null);
    }
  }.observes('selectedItems.[]'),

  openDefaultPanel: function() {
    if( Ember.isPresent(this.get('defaultOpenPanelName')) ) {
      this.send('togglePanel', this.get('defaultOpenPanelName'));
    }
  }.on('init'),

  actions: {
    togglePanel: function(panelName) {
      var openPanelName = this.get('openPanelName');

      if( Ember.isBlank(openPanelName) || Ember.isEqual(openPanelName, panelName) ) {
        this.get('parentAccordion').send('toggleItem', this);
      }

      // set/unset openPanelName
      if(Ember.isEqual(openPanelName, panelName)) {
        this.set('openPanelName', null);
      } else {
        this.set('openPanelName', panelName);
      }
    }
  }
});
