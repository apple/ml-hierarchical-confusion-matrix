var widgets = require("@jupyter-widgets/base");
var _ = require("lodash");
const confMat = require("./confMat");

// See NeoWidget.py for the kernel counterpart to this file.

// Custom Model. Custom widgets models must at least provide default values
// for model attributes, including
//
//  - `_view_name`
//  - `_view_module`
//  - `_view_module_version`
//
//  - `_model_name`
//  - `_model_module`
//  - `_model_module_version`
//
//  when different from the base class.

// When serialiazing the entire widget state for embedding, only values that
// differ from the defaults will be specified.
var HierchicalConfusionMatrixModel = widgets.DOMWidgetModel.extend({
  defaults: _.extend(widgets.DOMWidgetModel.prototype.defaults(), {
    _model_name: "HierchicalConfusionMatrixModel",
    _view_name: "HierchicalConfusionMatrixView",
    _model_module: "neo-confusion-jupyter",
    _view_module: "neo-confusion-jupyter",
    _model_module_version: "0.1.0",
    _view_module_version: "0.1.0",
  }),
});

// Custom View. Renders the widget model.
var HierchicalConfusionMatrixView = widgets.DOMWidgetView.extend({
  // Defines how the widget gets rendered into the DOM
  render: function () {
    try {
      // parse data
      let dataStr = this.model.get("inputData");
      let data = JSON.parse(dataStr);

      //console.log("RECIEVED DATA", data);

      // TODO TEST ONLY
      const spec = {
        classes: ["root"],
      };
      confMat.embedElement(this.el, spec, data);

      // Observe changes in the value traitlet in Python, and define
      // a custom callback.
      this.model.on("change:inputData", this.data_changed, this);
    } catch (error) {
      // ERROR CASE
      console.error("Error loading in data to populate matrix: ", error);
      this.el.textContent = this.model.get(
        "Error loading in data to populate matrix: "
      );
    }
  },

  data_changed: function () {
    // TODO UPDATE MATRIX WITH NEW DATA
    this.el.textContent = this.model.get("inputData");
  },
});

module.exports = {
  HierchicalConfusionMatrixModel: HierchicalConfusionMatrixModel,
  HierchicalConfusionMatrixView: HierchicalConfusionMatrixView,
};
