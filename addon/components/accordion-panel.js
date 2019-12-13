import { next } from "@ember/runloop";
import Component from "@ember/component";
import { computed } from "@ember/object";
import { isEqual } from "@ember/utils";
import layout from "../templates/components/accordion-panel";

export default Component.extend({
  layout,
  classNames: ["AccordionPanel"],
  classNameBindings: ["isActive"],

  // Inputs
  panelName: "panel-one",

  isActive: computed("activePanelName", "panelName", function() {
    return isEqual(this.get("activePanelName"), this.get("panelName"));
  }),
  openOnInit: false,
  _activateDefaultPanel() {
    if (this.isDestroying) {
      return;
    }

    if (this.get("openOnInit")) {
      this.get("toggle")(this.get("panelName"));
    }
  },

  init() {
    this._super(...arguments);
    next(() => {
      this.get("register")(this.get("panelName"));
      this._activateDefaultPanel();
    });
  },

  willDestroyElement() {
    this.get("unregister")(this.get("panelName"));
  }
});
