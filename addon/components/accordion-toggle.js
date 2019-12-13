import Component from "@ember/component";
import { computed } from "@ember/object";
import { isEqual } from "@ember/utils";
import layout from "../templates/components/accordion-toggle";

export default Component.extend({
  layout,
  classNames: ["AccordionToggle"],
  classNameBindings: ["isActive", "disabled"],

  // Input params
  disabled: null,
  panelName: "panel-one",

  isActive: computed("activePanelName", "panelName", function() {
    return isEqual(this.get("activePanelName"), this.get("panelName"));
  }),

  click: function() {
    if (!this.get("disabled")) {
      this.get("toggle")(this.get("panelName"));
    }
    return false;
  }
});
