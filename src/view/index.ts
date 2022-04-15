/*
 * For licensing see accompanying LICENSE file.
 *
 * Copyright (C) 2022 Apple Inc. All Rights Reserved.
 */

import { accuracy, Matrix, precision, recall } from '../matrix';
import { ColumnNormalization, Mapping, RowNormalization } from './mapping';
import { Count, Probability, Statistic } from './statistics';
import type { Measure, Normalization } from '../specification';
import { Total } from './mapping';

export function toStatistic(matrix: Matrix, measure: Measure): Statistic {
    switch (measure) {
        case 'precision': return new Probability(matrix, 'Precision', precision);
        case 'recall': return new Probability(matrix, 'Recall', recall);
        case 'accuracy': return new Probability(matrix, 'Accuracy', accuracy);
        case 'countActual': return new Count(matrix, 'Count Actual', (m, e) => m.totalRow(e));
        case 'countObserved': return new Count(matrix, 'Count Observed', (m, e) => m.totalColumn(e));
        case 'truePositives': return new Count(matrix, 'True Positives', (m, e) => m.truePositives(e));
        case 'trueNegatives': return new Count(matrix, 'True Negatives', (m, e) => m.trueNegatives(e));
        case 'falsePositives': return new Count(matrix, 'False Positives', (m, e) => m.falsePositives(e));
        case 'falseNegatives': return new Count(matrix, 'False Negatives', (m, e) => m.falseNegatives(e));
        default: throw new Error(`No such measure: ${measure}.`);
    }
}

export function toMapping(
    matrix: Matrix,
    collapsed: Set<string>,
    normalization: Normalization,
): Mapping {
    switch (normalization) {
        case 'total': return new Total(matrix, collapsed);
        case 'row': return new RowNormalization(matrix);
        case 'column': return new ColumnNormalization(matrix);
        default: throw new Error(`No such normalization: ${normalization}.`);
    }
}

export { nFormatter as format, Statistic } from './statistics';
