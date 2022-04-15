/*
 * For licensing see accompanying LICENSE file.
 *
 * Copyright (C) 2022 Apple Inc. All Rights Reserved.
 */

import { nest, powerset } from '../src/setops';

test('Powerset', () => {
    const set = ['a', 'b', 'c'];
    const pow = [
        new Set([]),
        new Set(['a']),
        new Set(['b']),
        new Set(['c']),
        new Set(['a', 'b']),
        new Set(['a', 'c']),
        new Set(['b', 'c']),
        new Set(['a', 'b', 'c']),
    ];
    expect(powerset(set)).toHaveLength(pow.length);
    expect(new Set(powerset(set))).toStrictEqual(new Set(pow));
});

test('Nest', () => {
    const abc = ['a', 'b', 'c'];
    const xy = ['x', 'y'];
    expect(nest(abc, xy)).toHaveLength(abc.length * xy.length + abc.length);
    expect(nest(abc, xy)).toStrictEqual([
        ['a'],
        ['b'],
        ['c'],
        ['a', 'x'],
        ['a', 'y'],
        ['b', 'x'],
        ['b', 'y'],
        ['c', 'x'],
        ['c', 'y'],
    ]);
});
