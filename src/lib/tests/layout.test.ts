/*
 * For licensing see accompanying LICENSE file.
 *
 * Copyright (C) 2022 Apple Inc. All Rights Reserved.
 */

import { flip, layoutClassic, layoutCompact } from '../layout';
import { simpleTree } from './node.test';

test('layoutCompactVertical', () => {
    const positions = [
        { node: 'a', pos: [0, 0], span: 5 },
        { node: 'b', pos: [1, 0], span: 2 },
        { node: 'e', pos: [2, 0], span: 1 },
        { node: 'f', pos: [2, 1], span: 1 },
        { node: 'c', pos: [1, 2], span: 1 },
        { node: 'd', pos: [1, 3], span: 2 },
        { node: 'g', pos: [2, 3], span: 1 },
        { node: 'h', pos: [2, 4], span: 1 },
    ];

    const l = layoutCompact((_) => true, simpleTree());
    const result = l.map(({ node, pos, span }) => ({ node: node.data, pos, span }));
    expect(result).toStrictEqual(positions);
});

test('layoutCompactHorizontal', () => {
    const positions = [
        { node: 'a', pos: [0, 0], span: 5 },
        { node: 'b', pos: [0, 1], span: 2 },
        { node: 'e', pos: [0, 2], span: 1 },
        { node: 'f', pos: [1, 2], span: 1 },
        { node: 'c', pos: [2, 1], span: 1 },
        { node: 'd', pos: [3, 1], span: 2 },
        { node: 'g', pos: [3, 2], span: 1 },
        { node: 'h', pos: [4, 2], span: 1 },
    ];

    const l = flip(layoutCompact((_) => true, simpleTree()));
    const result = l.map(({ node, pos, span }) => ({ node: node.data, pos, span }));
    expect(result).toStrictEqual(positions);
});

test('layoutClassicalVertical', () => {
    const positions = [
        { node: 'a', pos: [0, 0], span: 7 },
        { node: 'b', pos: [1, 1], span: 2 },
        { node: 'e', pos: [2, 2], span: 0 },
        { node: 'f', pos: [2, 3], span: 0 },
        { node: 'c', pos: [1, 4], span: 0 },
        { node: 'd', pos: [1, 5], span: 2 },
        { node: 'g', pos: [2, 6], span: 0 },
        { node: 'h', pos: [2, 7], span: 0 },
    ];

    const l = layoutClassic((_) => true, simpleTree());
    const result = l.map(({ node, pos, span }) => ({ node: node.data, pos, span }));
    expect(result).toStrictEqual(positions);
});
