/*
 * For licensing see accompanying LICENSE file.
 *
 * Copyright (C) 2022 Apple Inc. All Rights Reserved.
 */

import type { Confusion } from '../confusions';
import { parseTagString as parse } from '../parser';
import { stringify } from '../confusions';

interface ConfusionInterface {
    rt: string; // eslint-disable-line camelcase
    at: string; // eslint-disable-line camelcase
    oc: number;
}

// TODO: Write test case
export async function vegaCompressed(filename: string): Promise<Array<Confusion>> {
    const response = await fetch(filename);
    const json = await response.json();
    const data = json.data.values;

    return data.map(
        (d: ConfusionInterface): Confusion => ({
            actual: parse(d.rt).map((l) => stringify(l)),
            observed: parse(d.at).map((l) => stringify(l)),
            count: d.oc,
        })
    );
}
