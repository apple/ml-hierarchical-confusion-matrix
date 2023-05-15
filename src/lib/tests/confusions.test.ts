/*
 * For licensing see accompanying LICENSE file.
 *
 * Copyright (C) 2022 Apple Inc. All Rights Reserved.
 */

import { buildHierarchy, dimensions, linearize, nest, paths, stringify } from '../confusions';
import { Node } from '../node';
import { synth } from '../loaders/synth';

test('Parse and build simple tree', () => {
    const labels = ['a:b', 'a:c'];
    const root = buildHierarchy(labels);

    let result = '';
    root.fullorder(
        (n) => (result += n.data.name),
        (n) => (result += n.data.name)
    );
    expect(result).toBe('rootabbccaroot');
});

test('Linearize', () => {
    expect(linearize(['a:b', 'a:c'])).toStrictEqual(['a:{b,c}']);
    expect(linearize(['a:b', 'x:y'])).toStrictEqual(['a:b', 'x:y']);
});

test('Nest labels', () => {
    const labels = ['abc:a', 'xy:x'];
    nest(labels, 'abc', 'xy');
    expect(labels).toStrictEqual(['abc:a:xy:x']);
});

test('Stringify', () => {
    expect(stringify(new Node('a'))).toStrictEqual('a');
    expect(stringify(new Node('a', new Node('b')))).toStrictEqual('a:b');
});

test('Extract dimensions', () => {
    const dims = dimensions(synth());
    expect(dims).toStrictEqual(new Set(['state', 'vehicle', 'animal']));
});

test('Extract path', () => {
    const root = new Node('a', new Node('b', new Node('c'), new Node('d')), new Node('e'));
    expect(paths(root)).toStrictEqual(new Set(['a:b:c', 'a:b:d', 'a:e']));
});
