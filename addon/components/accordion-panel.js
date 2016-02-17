import Ember from 'ember';
import ElementActiveState from '../mixins/element-active-state';
const { on, computed, isEqual }  = Ember;

const AccordionPanelComponent = Ember.Component.extend(ElementActiveState, {
  accordion: Ember.inject.service('accordion'),
  classNames: ["AccordionPanel"],

  // Inputs
  panelName: 'panel-one',

  openOnInit: false,
  didInsertElement() {
    this._super(...arguments);
    Ember.run.next(this, '_activateDefaultPanel');
  },
  _activateDefaultPanel() {
    if(this.get('openOnInit')) {
      this.get('accordion').toggleClick(this.getProperties('listId', 'itemId', 'panelName'));
    }
  }
});

AccordionPanelComponent.reopenClass({
  positionalParams: ['listId', 'itemId']
});

export default AccordionPanelComponent;
