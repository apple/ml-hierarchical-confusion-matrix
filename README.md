# Neo: Hierarchical Confusion Matrix

[![npm version](https://img.shields.io/npm/v/@apple/hierarchical-confusion-matrix.svg)](https://www.npmjs.com/package/@apple/hierarchical-confusion-matrix)

The confusion matrix, a ubiquitous visualization for helping people evaluate machine learning models, is a tabular layout that compares predicted class labels against actual class labels over all data instances. Neo is a visual analytics system that enables practitioners to flexibly author and interact with hierarchical and multi-output confusion matrices, visualize derived metrics, renormalize confusions, and share matrix specifications.

This code accompanies the research paper:

**[Neo: Generalizing Confusion Matrix Visualization to Hierarchical and Multi-Output Labels](https://machinelearning.apple.com/research/generalizing-confusion-matrix)**  
Jochen Görtler, Fred Hohman, Dominik Moritz, Kanit Wongsuphasawat, Donghao Ren, Rahul Nair, Marc Kirchner, Kayur Patel  
*ACM Conference on Human Factors in Computing Systems (CHI), 2022.*  
[<img width="16" alt="image" src="https://user-images.githubusercontent.com/5741691/166707770-eac596b5-2622-4899-9ff8-8c3037b03b3a.png"> Paper](https://arxiv.org/abs/2110.12536), [<img width="12" alt="image" src="https://user-images.githubusercontent.com/5741691/166709218-c8fa7af7-a5a4-467b-b77d-679aaf1aabda.png"> Live demo](https://apple.github.io/ml-hierarchical-confusion-matrix/), [<img width="18" alt="image" src="https://user-images.githubusercontent.com/5741691/166709344-e11b80c9-1b24-4412-bd7d-03c7e3dfaecc.png"> Video](https://www.youtube.com/watch?v=LmsJJDHfGlI), [<img width="18" alt="image" src="https://user-images.githubusercontent.com/5741691/166709459-5d0e44a5-0dbc-4679-b071-10ed0a3cdd92.png"> Video Preview](https://www.youtube.com/watch?v=8ZxvsLPIF_Q), [<img width="20" alt="image" src="https://user-images.githubusercontent.com/5741691/166706116-4d2c003f-fd68-4b75-b896-8f9a588318c1.png"> Code](https://github.com/apple/ml-hierarchical-confusion-matrix/) 

## Documentation

You can embed our confusion matrix visualization into your own project. There are two ways to use it. 

### NPM

Install with `npm install --save @apple/hierarchical-confusion-matrix` or `yarn add @apple/hierarchical-confusion-matrix`.

Then you can import the module in your project

```js
import confMat from "@apple/hierarchical-confusion-matrix";

const spec = {
    classes: ['root'],
}

const confusions = [
    {
        actual: ['root:a'],
        observed: ['root:a'],
        count: 1,
    },
    {
        actual: ['root:a'],
        observed: ['root:b'],
        count: 2,
    },
    {
        actual: ['root:b'],
        observed: ['root:a'],
        count: 3,
    },
    {
        actual: ['root:b'],
        observed: ['root:b'],
        count: 4,
    }
]

confMat.embed('matContainer', spec, confusions);
```

### Embed the Compiled File

If you prefer to load the compiled JavaScript directly, you have to compile it. To do this, run `yarn install` and copy the `public/confMat.js` into your project. Here is a simple example of a small confusion matrix:

```html
<!doctype html>
<html>
<head>
    <meta charset="utf8">
    <meta name="viewport" content="width=device-width">
    <title>Neo: Hierarchical Confusion Matrix</title>
</head>

<body>
    <div id="matContainer"></div>
    <script src="confMat.js"></script>
    <script>
        const spec = {
            classes: ['root'],
        }

        const confusions = [
            {
                actual: ['root:a'],
                observed: ['root:a'],
                count: 1,
            },
            {
                actual: ['root:a'],
                observed: ['root:b'],
                count: 2,
            },
            {
                actual: ['root:b'],
                observed: ['root:a'],
                count: 3,
            },
            {
                actual: ['root:b'],
                observed: ['root:b'],
                count: 4,
            }
        ]

        confMat.embed('matContainer', spec, confusions);
    </script>
</body>
</html>
```

### Specification 

You can find all the options that you can pass via the `spec` argument in [`src/specification.ts`](src/specification.ts).

### Loaders

The different loaders can be found in [`src/loaders`](src/loaders), which include loading data from `json`, `csv`, `vega`, and a synthetic example `synth` for testing.

### Confusion Data Format Examples

#### Example 1: Conventional Confusions
The confusions for data with `actual` labels of `fruit:lemon` that are incorrectly predicted as `fruit:apple`, of which there are `count` 1 of them. 

```json
{
    "actual": [
        "fruit:lemon"
    ],
    "observed": [
        "fruit:apple"
    ],
    "count": 1
}
```

#### Example 2: Hierarchical Confusions
The confusions for hierarchical data with `actual` labels of `fruit:citrus:lemon` that are incorrectly predicted as `fruit:pome:apple`, of which there are `count` 2 of them. Note `:` denotes hierarchies.

```json
{
    "actual": [
        "fruit:citrus:lemon"
    ],
    "observed": [
        "fruit:pome:apple"
    ],
    "count": 2
}
```

#### Example 3: Multi-output Confusions
The confusions for multi-output data with `actual` labels of `fruit:lemon,taste:sweet` that are incorrectly predicted as `fruit:apple,taste:sour`, of which there are `count` 3 of them. Note `,` denotes multi-ouput labels.

```json
{
    "actual": [
        "fruit:lemon",
        "taste:sweet"
    ],
    "observed": [
        "fruit:apple",
        "taste:sour"
    ],
    "count": 3
}
```

#### Example 4: Hierarchical and Multi-output Confusions
The confusions for hierarchical and multi-output data with `actual` labels of `fruit:citrus:lemon,taste:sweet,ripeness:ripe` that are incorrectly predicted as `fruit:pome:apple,taste:sour,ripeness:not-ripe`, of which there are `count` 4 of them.

```json
{
    "actual": [
        "fruit:citrus:lemon",
        "taste:sweet",
        "ripeness:ripe"
    ],
    "observed": [
        "fruit:pome:apple",
        "taste:sour"
        "ripeness:not-ripe"
    ],
    "count": 4
}
```

See [`fruit.json`](public/data/fruit.json) for a complete example of confusions for a hierarchical fruit, taste, and ripeness classification model.

## Development

Build:

```sh
yarn install
yarn build
```

Test:

```sh
yarn test:unit
```

Dev Server:

```sh
yarn dev
```

Lint & Fix:

```sh
yarn lint
```

## Contributing

When making contributions, refer to the [`CONTRIBUTING`](CONTRIBUTING.md) guidelines and read the [`CODE OF CONDUCT`](CODE_OF_CONDUCT.md).

## BibTeX

To cite our paper, please use:

```bibtex
@inproceedings{goertler2022neo,
  title={Neo: Generalizing Confusion Matrix Visualization to Hierarchical and Multi-Output Labels},
  author={Görtler, Jochen and Hohman, Fred and Moritz, Dominik and Wongsuphasawat, Kanit and Ren, Donghao and Nair, Rahul and Kirchner, Marc and Patel, Kayur},
  booktitle={Proceedings of the SIGCHI Conference on Human Factors in Computing Systems},
  year={2022},
  organization={ACM},
  doi={10.1145/3491102.3501823}
}
```

## License

This code is released under the [`LICENSE`](LICENSE) terms.
