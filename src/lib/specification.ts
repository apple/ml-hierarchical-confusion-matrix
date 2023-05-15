/*
 * For licensing see accompanying LICENSE file.
 *
 * Copyright (C) 2022 Apple Inc. All Rights Reserved.
 */

// TODO: Support more complex queries later on.
export interface Condition {
    qualifier: 'actual' | 'observed';
    label: string;
    is: string;
}

export type Measure =
    | 'count'
    | 'precision'
    | 'recall'
    | 'accuracy'
    | 'countActual'
    | 'countObserved'
    | 'truePositives'
    | 'trueNegatives'
    | 'falsePositives'
    | 'falseNegatives';

export type Normalization = 'total' | 'row' | 'column';
export type Encoding = 'size' | 'color';

export interface Spec extends Defaults {
    classes: Array<string>;
    where?: Condition; // TODO: Add multiple conditionals combined using AND back in.
    filter?: Array<string>; // Filters are combined using OR.
}

export interface Defaults {
    normalization: Normalization;
    encoding: Encoding;
    collapsed: Array<string>;
    measures: Array<Measure>;
}

export const defaults: Defaults = {
    normalization: 'total',
    encoding: 'color',
    collapsed: [],
    measures: [
        'precision',
        'recall',
        'accuracy',
        // 'countActual',
        // 'countObserved',
        // 'truePositives',
        // 'trueNegatives',
        // 'falsePositives',
        // 'falseNegatives',
    ],
};

// TODO: Create a state object that takes care of internal representation.
// Then, we would only need methods to convert between that class and `Spec`.
// This state object could also hold the data.
