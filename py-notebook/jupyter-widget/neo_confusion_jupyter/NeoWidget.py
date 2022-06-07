from os import error
import ipywidgets as widgets
from traitlets import Unicode, List
import json
import numpy as np


# See js/lib/NeoWidget.js for the frontend counterpart to this file.


@widgets.register
class HierchicalConfusionMatrix(widgets.DOMWidget):
    """An example widget."""

    # Name of the widget view class in front-end
    _view_name = Unicode('HierchicalConfusionMatrixView').tag(sync=True)

    # Name of the widget model class in front-end
    _model_name = Unicode('HierchicalConfusionMatrixModel').tag(sync=True)

    # Name of the front-end module containing widget view
    _view_module = Unicode('neo-confusion-jupyter').tag(sync=True)

    # Name of the front-end module containing widget model
    _model_module = Unicode('neo-confusion-jupyter').tag(sync=True)

    # Version of the front-end module containing widget view
    _view_module_version = Unicode('^0.1.0').tag(sync=True)
    # Version of the front-end module containing widget model
    _model_module_version = Unicode('^0.1.0').tag(sync=True)

    # Widget specific property.
    # Widget properties are defined as traitlets. Any property tagged with `sync=True`
    # is automatically synced to the frontend *any* time it changes in Python.
    # It is synced back to Python from the frontend *any* time the model is touched.
    inputData = Unicode('No data').tag(sync=True)
    rootClasses = List([]).tag(sync=True)

    def __init__(self, options={}, root=['root']):
        super().__init__()
        self.processInput(options, root)

    def processInput(self, options, root=['root']):
        try:
            confusion = self.formatData(options)
            msg = json.dumps(confusion, cls=SpecialEncoder)
            self.inputData = msg
            self.rootClasses = root

        except Exception as err:
            print(
                "Trouble processing inputs. Expected input: { true: ndarray, predicted: ndarray, labels: ndarray }", err)

    def formatData(self, options):
        if options is None or not options:
            return self.dummyData()

        if isinstance(options, list):
            return self.jsonFormat(options)

        y_true = options['true']
        y_pred = options['predicted']
        labels = options['labels']
        if y_true is not None and y_pred is not None and labels is not None:
            return self.scikitFormat(y_true, y_pred, labels)

    def scikitFormat(self, y_true, y_pred, labels):
        from sklearn.metrics import confusion_matrix
        counts = confusion_matrix(y_true, y_pred)
        confusion = []
        for i, row in enumerate(counts):
            for j, item in enumerate(row):
                actual = 'root:' + str(labels[i])
                observed = 'root:' + str(labels[j])
                count = item
                confusion.append({'actual': [actual], 'observed': [
                    observed], 'count': count})
        return confusion  # target format that widget expects

    def jsonFormat(self, confusion):
        return confusion

    def dummyData(self):
        return [
            {
                'actual': ['root:a'],
                'observed': ['root:a'],
                'count': 1,
            },
            {
                'actual': ['root:a'],
                'observed': ['root:b'],
                'count': 2,
            },
            {
                'actual': ['root:b'],
                'observed': ['root:a'],
                'count': 3,
            },
            {
                'actual': ['root:b'],
                'observed': ['root:b'],
                'count': 4,
            }
        ]


class SpecialEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.integer):
            return int(obj)
        if isinstance(obj, np.floating):
            return float(obj)
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        return super(SpecialEncoder, self).default(obj)
