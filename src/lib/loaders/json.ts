/*
 * For licensing see accompanying LICENSE file.
 *
 * Copyright (C) 2022 Apple Inc. All Rights Reserved.
 */

import type { Confusion } from '../confusions';

// TODO: Write test case
export async function json(filename: string): Promise<Array<Confusion>> {
    const response = await fetch(filename);
    const json = await response.json();
    const data = json.data.values;

    return data;
}
