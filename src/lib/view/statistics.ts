/*
 * For licensing see accompanying LICENSE file.
 *
 * Copyright (C) 2022 Apple Inc. All Rights Reserved.
 */

import type { Entry, Matrix } from '../matrix';
import { scaleLinear } from 'd3-scale';
import type { ScaleLinear } from 'd3-scale';

export interface Statistic {
    name(): string;
    value(entry: Entry): [normalized: number, valueStr: string];
}

/** Adapted from https://stackoverflow.com/a/9462382 */
// TODO: Use d3-format
export function nFormatter(num: number, digits: number): string {
    const si = [
        { value: 1, symbol: '' },
        { value: 1e3, symbol: 'k' },
        { value: 1e6, symbol: 'M' },
        { value: 1e9, symbol: 'G' },
        { value: 1e12, symbol: 'T' },
        { value: 1e15, symbol: 'P' },
        { value: 1e18, symbol: 'E' },
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    let i: number;
    for (i = si.length - 1; i > 0; i--) {
        if (num >= si[i].value) {
            break;
        }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, '$1') + si[i].symbol;
}

export class Probability implements Statistic {
    constructor(
        private matrix: Matrix,
        private desc: string,
        private fn: (m: Matrix, e: Entry) => number,
        private digits: number = 2
    ) {}

    name(): string {
        return this.desc;
    }

    value(entry: Entry): [normalized: number, valueStr: string] {
        const normalized = this.fn(this.matrix, entry);
        const valueStr = normalized.toFixed(this.digits);
        return [normalized, valueStr];
    }
}

export class Count implements Statistic {
    private scale: ScaleLinear<number, number>;
    constructor(
        private matrix: Matrix,
        private desc: string,
        private fn: (m: Matrix, e: Entry) => number
    ) {
        const minmax = [Infinity, -Infinity];
        this.matrix.axis.preorder((n) => {
            const count = fn(matrix, n);
            minmax[0] = Math.min(minmax[0], count);
            minmax[1] = Math.max(minmax[1], count);
        });
        this.scale = scaleLinear().domain(minmax);
    }

    name(): string {
        return this.desc;
    }

    value(entry: Entry): [normalized: number, valueStr: string] {
        const count = this.fn(this.matrix, entry);
        const normalized = this.scale(count);
        const valueStr = nFormatter(count, 0);
        return [normalized, valueStr];
    }
}
