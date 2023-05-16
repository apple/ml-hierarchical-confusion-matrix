/*
 * For licensing see accompanying LICENSE file.
 *
 * Copyright (C) 2022 Apple Inc. All Rights Reserved.
 */

import type { Confusion } from '../confusions';

// TODO: Write test case
export async function json(filename: string): Promise<Array<Confusion>> {
    // TODO: should use https://kit.svelte.dev/docs/load or some other way to load data that does not involve using window.location.href
    const response = await fetch(`${window.location.href}/${filename}`);
    const json = await response.json();
    return json.data.values;
}
