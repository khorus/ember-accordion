import Ember from 'ember';
import layout from '../templates/components/accordion-panel';

const { computed, isEqual }  = Ember;

const AccordionPanelComponent = Ember.Component.extend({
  layout,
  classNames: ["AccordionPanel"],
  classNameBindings: ['isActive'],

  // Inputs
  panelName: 'panel-one',

  isActive: computed('activePanelName', 'panelName', function() {
    return isEqual(this.get('activePanelName'), this.get('panelName'));
  }),
  openOnInit: false,
  _activateDefaultPanel() {
    if(this.isDestroying) { return; }

    if(this.get('openOnInit')) {
      this.get('toggle')(this.get('panelName'));
    }
  },

  init() {
    this._super(...arguments);
    this.get('register')(this.get('panelName'));
    Ember.run.next(() => {
      this._activateDefaultPanel();
    });
  },

  willDestroyElement() {
    this.get('unregister')(this.get('panelName'));
  },
});

AccordionPanelComponent.reopenClass({
  positionalParams: ['activePanelName', 'toggle']
});

export default AccordionPanelComponent;
