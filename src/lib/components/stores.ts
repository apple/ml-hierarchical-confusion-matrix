/*
 * For licensing see accompanying LICENSE file.
 *
 * Copyright (C) 2022 Apple Inc. All Rights Reserved.
 */

import { writable } from 'svelte/store';

export const currentCell = writable(null);
export const spec = writable(null);
