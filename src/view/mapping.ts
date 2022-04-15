/*
 * For licensing see accompanying LICENSE file.
 *
 * Copyright (C) 2022 Apple Inc. All Rights Reserved.
 */

import type { Entry, Matrix } from '../matrix';
import { ScaleLinear, scaleLinear } from 'd3-scale';

export interface Mapping {
    value(actual: Entry, observed: Entry): number,
    scale(): ScaleLinear<number, number>,
}

export class Total {
    private scaleLin: ScaleLinear<number, number>;
    constructor(private matrix: Matrix, collapsed: Set<string>) {
        const isFrontier = (e: Entry): boolean => e.isLeaf() || collapsed.has(e.data.id);
        const minmax = [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY];
        for (const actual of matrix.classes()) {
            for (const observed of matrix.classes()) {
                if (isFrontier(actual) && isFrontier(observed)) {
                    const freq = matrix.frequency(actual, observed);
                    minmax[1] = Math.max(minmax[1], freq);
                    if (freq > 0) {
                        minmax[0] = Math.min(minmax[0], freq);
                    }
                }
            }
        }
        this.scaleLin = scaleLinear().domain(minmax);
    }

    scale(): ScaleLinear<number, number> {
        return this.scaleLin;
    }

    value(actual: Entry, observed: Entry): number {
        return this.scaleLin(this.matrix.frequency(actual, observed));
    }
}

export class RowNormalization {
    private scaleMap: Map<Entry, ScaleLinear<number, number>>;
    constructor(private matrix: Matrix) {
        const scaleMap = new Map();
        for (const row of matrix.classes()) {
            scaleMap.set(row, scaleLinear().domain([0, matrix.totalRow(row)]));
        }
        this.scaleMap = scaleMap;
    }

    scale(): ScaleLinear<number, number> {
        return scaleLinear();
    }

    value(actual: Entry, observed: Entry): number {
        return this.scaleMap.get(actual)(this.matrix.frequency(actual, observed));
    }
}

export class ColumnNormalization {
    private scaleMap: Map<Entry, ScaleLinear<number, number>>;
    constructor(private matrix: Matrix) {
        const scaleMap = new Map();
        for (const row of matrix.classes()) {
            scaleMap.set(row, scaleLinear().domain([0, matrix.totalColumn(row)]));
        }
        this.scaleMap = scaleMap;
    }

    scale(): ScaleLinear<number, number> {
        return scaleLinear();
    }

    value(actual: Entry, observed: Entry): number {
        return this.scaleMap.get(observed)(this.matrix.frequency(actual, observed));
    }
}
