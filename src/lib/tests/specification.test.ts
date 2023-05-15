/*
 * For licensing see accompanying LICENSE file.
 *
 * Copyright (C) 2022 Apple Inc. All Rights Reserved.
 */

import { defaults } from '../specification';
import { nop } from '../util';
import type { Spec } from '../specification';

test('One category', () => {
    const spec: Spec = {
        ...defaults,
        classes: ['animal'],
    };
    nop(spec); // silence warnings
});

test('Parameters', () => {
    const spec: Spec = {
        ...defaults,
        classes: ['animal'],
        measures: ['count', 'precision', 'recall', 'accuracy'],
        encoding: 'color',
        normalization: 'row',
    };
    nop(spec); // silence warnings
});

test('Subview of one category', () => {
    const spec: Spec = {
        ...defaults,
        classes: ['animal'], filter: ['animal:insects'],
    };
    nop(spec); // silence warnings
});

test('Nesting two labels', () => {
    const spec: Spec = {
        ...defaults,
        classes: ['beverage', 'state'],
    };
    nop(spec); // silence warnings
});

test('Conditioning on a second label with an additional filter', () => {
    const spec: Spec = {
        ...defaults,
        classes: ['beverage'],
        where: { qualifier: 'actual', label: 'state', is: 'state:open' },
        filter: ['beverage:soda', 'beverage:water'],
    };
    nop(spec); // silence warnings
});
