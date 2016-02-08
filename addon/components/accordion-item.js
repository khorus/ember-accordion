import Ember from 'ember';
import layout from '../templates/components/accordion-item';

const AccordionItemComponent = Ember.Component.extend({
  layout: layout,
  classNames: ["AccordionItem"],

  // Inputs
  defaultOpenPanel: null,

  openPanel: null,
  closePanelWhenNotOpen: Ember.observer('openItems.[]', function() {
    console.log(this.toString() + "closePanelWhenNotOpen " + this.get('openItems'));
    if( !this.get('openItems').contains(this) ) {
      console.log(this.toString() + "set openPanel to null");
      this.set('openPanel', null);
    }
  }),

  openDefaultPanel: Ember.on('init', function() {
    if( Ember.isPresent(this.get('defaultOpenPanel')) ) {
      this.send('togglePanel', this.get('defaultOpenPanel'));
    }
  }),

  accordionItem: Ember.computed( function() { return this; }),

  actions: {
    togglePanel: function(panel) {
      console.log(this.toString() + "togglePanel panel: " + panel);
      var openPanel = this.get('openPanel');

      if( Ember.isBlank(openPanel) || Ember.isEqual(openPanel, panel) ) {
        this.get('toggleItem')(this);
      }

      // set/unset openPanel
      if(Ember.isEqual(openPanel, panel)) {
        this.set('openPanel', null);
      } else {
        this.set('openPanel', panel);
      }
    }
  }
});

AccordionItemComponent.reopenClass({
  positionalParams: ['openItems', 'toggleItem']
});

export default AccordionItemComponent;
