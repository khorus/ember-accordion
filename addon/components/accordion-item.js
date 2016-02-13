import Ember from 'ember';

// Required Positional Params
// activeItems
// itemClickHandler
//
// Optional Positional Params
const AccordionItemComponent = Ember.Component.extend({
  classNames: ["AccordionItem"],

  defaultActivePanel: null,

  activePanel: null,
  _closePanelWhenNotActive: Ember.observer('activeItems.[]', function() {
    console.log(this.toString() + "closePanelWhenNotActive " + this.get('activeItems'));
    if( !this.get('activeItems').contains(this) ) {
      console.log(this.toString() + "set activePanel to null");
      this.set('activePanel', null);
    }
  }),

  _activateDefaultPanel: Ember.on('init', function() {
    if( Ember.isPresent(this.get('defaultActivePanel')) ) {
      this.send('clickHandler', this.get('defaultActivePanel'));
    }
  }),

  accordionItem: Ember.computed( function() { return this; }),

  actions: {
    clickHandler: function(panel) {
      console.log(this.toString() + "clickHandler panel: " + panel);
      var activePanel = this.get('activePanel');

      if( Ember.isBlank(activePanel) || Ember.isEqual(activePanel, panel) ) {
        this.get('listClickHandler')(this);
      }

      // set/unset activePanel
      if(Ember.isEqual(activePanel, panel)) {
        this.set('activePanel', null);
      } else {
        this.set('activePanel', panel);
      }
    }
  }
});

AccordionItemComponent.reopenClass({
  positionalParams: ['activeItems', 'listClickHandler']
});

export default AccordionItemComponent;
