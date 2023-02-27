var plugin = require('./index');
var base = require('@jupyter-widgets/base');

module.exports = {
  id: 'neo-confusion-jupyter:plugin',
  requires: [base.IJupyterWidgetRegistry],
  activate: function(app, widgets) {
      widgets.registerWidget({
          name: 'neo-confusion-jupyter',
          version: plugin.version,
          exports: plugin
      });
  },
  autoStart: true
};

