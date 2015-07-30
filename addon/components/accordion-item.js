import Ember from 'ember';
import layout from '../templates/components/accordion-item';

export default Ember.Component.extend({
  layout: layout,
  classNames: ["AccordionItem"],

  // Inputs
  parentAccordion: null,
  defaultOpenPanelName: null,

  openPanelName: null,
  closePanelWhenNotSelected: function() {
    if( !this.get('parentAccordion.selectedItems').contains(this) ) {
      //console.log(this.toString() + "closing bc its not selected. parentAccordion " +this.get('parentAccordion').elementId);
      this.set('openPanelName', null);
    }
  }.observes('parentAccordion.selectedItems.[]'),

  openDefaultPanel: function() {
    if( Ember.isPresent(this.get('defaultOpenPanelName')) ) {
      this.send('togglePanel', this.get('defaultOpenPanelName'));
    }
  }.on('init'),

  accordionItem: Ember.computed( function() { return this; }),

  actions: {
    togglePanel: function(panelName) {
      //console.log(this.toString() + "togglePanel panelName: " + panelName);
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
