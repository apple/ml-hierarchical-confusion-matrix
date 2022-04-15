/*
 * For licensing see accompanying LICENSE file.
 *
 * Copyright (C) 2022 Apple Inc. All Rights Reserved.
 */

import { Entry, Matrix } from '../src/matrix';
import ndarray from 'ndarray';
import { Node } from '../src/node';

/**
 * The confusion matrix looks like this:
 *   A B C
 * A 3 5 2
 * B 3 4 3
 * C 1 2 7
 */
export function synthMatrix(): Matrix {
    const freqs = ndarray(new Int32Array(9), [3, 3]);
    freqs.set(0, 0, 3);
    freqs.set(0, 1, 5);
    freqs.set(0, 2, 2);
    freqs.set(1, 0, 3);
    freqs.set(1, 1, 4);
    freqs.set(1, 2, 3);
    freqs.set(2, 0, 1);
    freqs.set(2, 1, 2);
    freqs.set(2, 2, 7);

    const root: Entry = new Node(
        { name: 'root', id: 'root', start: 0, end: 3 },
        new Node({ name: 'A', id: 'A', start: 0, end: 1 }),
        new Node(
            { name: '[BC]', id: 'A:[BC]', start: 1, end: 3 },
            new Node({ name: 'B', id: 'A:[BC]:B', start: 1, end: 2 }),
            new Node({ name: 'C', id: 'A:[BC]:C', start: 2, end: 3 }),
        ),
    );
    return new Matrix(freqs, root);
}

test('totalCount', () => {
    expect(synthMatrix().total()).toBe(30);
});

test('classes', () => {
    const result = synthMatrix()
        .classes()
        .reduce((acc, n) => acc += n.data.name, '');
    expect(result).toBe('rootA[BC]BC');
});

test('slice', () => {
    const matrix = synthMatrix();
    const slice1 = matrix.slice({ start: 1, end: 3 }, { start: 1, end: 3 });
    expect(slice1.shape).toStrictEqual([2, 2]);
    expect(slice1.get(0, 0)).toBe(4);
    expect(slice1.get(0, 1)).toBe(3);
    expect(slice1.get(1, 0)).toBe(2);
    expect(slice1.get(1, 1)).toBe(7);

    const sliceSingle = matrix.slice({ start: 1, end: 2 }, { start: 1, end: 2 });
    expect(sliceSingle.shape).toStrictEqual([1, 1]);
    expect(sliceSingle.get(0, 0)).toBe(4);
});

test('totalRows', () => {
    const matrix = synthMatrix();
    const totals = matrix.classes().map(c => matrix.totalRow(c));
    expect(totals).toStrictEqual([30, 10, 20, 10, 10]);
});

test('totalColumns', () => {
    const matrix = synthMatrix();
    const totals = matrix.classes().map(c => matrix.totalColumn(c));
    expect(totals).toStrictEqual([30, 7, 23, 11, 12]);
});
