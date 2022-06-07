# neo-confusion-jupyter

A jupyter widget of the hierchical confusion matrix Neo CHI 2022

## Installation

To install use pip:

    $ pip install neo_confusion_jupyter

For a development installation (requires [Node.js](https://nodejs.org) and [Yarn version 1](https://classic.yarnpkg.com/)),

    $ pip install -e .
    $ jupyter nbextension install --py --symlink --overwrite --sys-prefix neo_confusion_jupyter
    $ jupyter nbextension enable --py --sys-prefix neo_confusion_jupyter

When actively developing your extension for JupyterLab, run the command:

    $ jupyter labextension develop --overwrite neo_confusion_jupyter

Then you need to rebuild the JS when you make a code change:

    $ cd js
    $ yarn run build

You then need to refresh the JupyterLab page when your javascript changes.
