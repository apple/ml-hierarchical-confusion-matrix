# A Jupyter Lab &amp; Jupyter Notebook widget for Neo

## Setup

To use Neo in Jupyter Lab or Jupyter Notebook, install a local Jupyter extension for neo from the command line:

1. In a terminal, navigate to the included jupyter extension folder:

`$ cd jupyter-widget`

2. Locally install the neo jupyter extension package to Python:

`$ pip install -e .`

3. Finally run these two commands to install the extension to your local Jupyter Lab and/or Jupyter notebook application

`$ jupyter nbextension install --py --symlink --overwrite --sys-prefix neo_confusion_jupyter`

`$ jupyter nbextension enable --py --sys-prefix neo_confusion_jupyter`

## Usage

See the notebook `demo.ipynb` for usage examples in action.

To run with dummy data

```py
from neo_confusion_jupyter import HierchicalConfusionMatrix as neo

neo() # Neo usage showing dummy data
```

To run with output typical of a scikit-learn workflow

```py
from neo_confusion_jupyter import HierchicalConfusionMatrix as neo 

neo({'true': y_test, 'predicted': y_pred, 'labels': labels})
```

To run with json formatted output

```py
from neo_confusion_jupyter import HierchicalConfusionMatrix as neo
import json

with open('fruit.json') as file:
    data = json.load(file)

rootLabels = ['fruit', 'taste', 'ripeness']

neo(data['data']['values'], root = rootLabels)
```
