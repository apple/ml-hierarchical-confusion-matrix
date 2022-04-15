/*
 * For licensing see accompanying LICENSE file.
 *
 * Copyright (C) 2022 Apple Inc. All Rights Reserved.
 */

import { Confusion, stringify } from '../confusions';
import { parseTagString as parse } from '../parser';

interface ConfusionInterface {
    reference_text: string; // eslint-disable-line camelcase
    annotation_text: string; // eslint-disable-line camelcase
    occurrence: number;
}

// TODO: Write test case
export async function vega(filename: string): Promise<Array<Confusion>> {
    const response = await fetch(filename);
    const json = await response.json();
    const data = json.data.values;

    return data.map((d: ConfusionInterface): Confusion => {
        return {
            actual: parse(d.reference_text).map(l => stringify(l)),
            observed: parse(d.annotation_text).map(l => stringify(l)),
            count: d.occurrence,
        };
    });
}
