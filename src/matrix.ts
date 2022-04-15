/*
 * For licensing see accompanying LICENSE file.
 *
 * Copyright (C) 2022 Apple Inc. All Rights Reserved.
 */

import type { NdArray } from 'ndarray';
import type { Node } from './node';
import ops from 'ndarray-ops';

export interface RangeIndex {
    start: number;
    end: number;
}

export interface Data {
    id: string;
    name: string;
}

export type Entry = Node<Data & RangeIndex>;

// TODO: use `ndarray-sum` to speed up these ops.
// TODO: Consider using prefix sum;
export class Matrix {
    constructor(
        readonly freqs: NdArray,
        readonly axis: Entry,
    ) { }

    slice(actual: RangeIndex, observed: RangeIndex): NdArray {
        return this.freqs
            .lo(actual.start, observed.start)
            .hi(actual.end - actual.start, observed.end - observed.start);
    }

    classes(): Array<Entry> {
        const result = [];
        this.axis.preorder(n => result.push(n));
        return result;
    }

    frequency(actual: Entry, observed: Entry): number {
        const slice = this.slice(actual.data, observed.data);
        return ops.sum(slice);
    }

    total(): number {
        return ops.sum(this.freqs);
    }

    totalRow(row: Entry): number {
        const slice = this.slice(row.data, { start: 0, end: this.freqs.shape[1] });
        return ops.sum(slice);
    }

    totalColumn(col: Entry): number {
        const slice = this.slice({ start: 0, end: this.freqs.shape[0] }, col.data);
        return ops.sum(slice);
    }

    truePositives(forClass: Entry): number {
        return forClass
            .leaves()
            .reduce((acc, c) => acc + this.frequency(c, c), 0);
    }

    falsePositives(forClass: Entry): number {
        const tpfp = this.totalColumn(forClass);
        return tpfp - this.truePositives(forClass);
    }

    trueNegatives(forClass: Entry): number {
        const completeDiag = this.axis
            .leaves()
            .reduce((acc, c) => acc + this.frequency(c, c), 0);
        return completeDiag - this.truePositives(forClass);
    }

    falseNegatives(forClass: Entry): number {
        const tnfn = this.totalRow(forClass);
        return tnfn - this.truePositives(forClass);
    }
}

export function precision(matrix: Matrix, forClass: Entry): number {
    return matrix.truePositives(forClass) / matrix.totalColumn(forClass);
}

export function recall(matrix: Matrix, forClass: Entry): number {
    return matrix.truePositives(forClass) / matrix.totalRow(forClass);
}

// TODO: This could probably be simplified
export function accuracy(matrix: Matrix, forClass: Entry): number {
    const tp = matrix.truePositives(forClass);
    const tn = matrix.trueNegatives(forClass);
    const fp = matrix.falsePositives(forClass);
    const fn = matrix.falseNegatives(forClass);
    return (tp + tn) / (tp + tn + fp + fn);
}
