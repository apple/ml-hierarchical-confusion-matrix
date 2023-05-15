/*
 * For licensing see accompanying LICENSE file.
 *
 * Copyright (C) 2022 Apple Inc. All Rights Reserved.
 */

import type { Confusion } from '../confusions';
import { csvParse } from 'd3-dsv';
import { parseTagString as parse } from '../parser';
import {  stringify } from '../confusions';

interface ConfusionInterface {
    'Ground Truth': string;
    'Prediction': string;
    'Count': string;
}

export async function csv(filename: string): Promise<Array<Confusion>> {
    const response = await fetch(filename);
    const text = await response.text();
    const data: Array<ConfusionInterface> = csvParse(text);

    return data.map(d => ({
        // TODO: Find a better solution than adding virtual nodes
        actual: parse(d['Ground Truth']).map(l => `root:${stringify(l)}`),
        observed: parse(d.Prediction).map(l => `root:${stringify(l)}`),
        count: Number(d.Count),
    }));
}
