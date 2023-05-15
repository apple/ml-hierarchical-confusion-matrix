/*
 * For licensing see accompanying LICENSE file.
 *
 * Copyright (C) 2022 Apple Inc. All Rights Reserved.
 */

import type { Confusion } from './confusions';
import { defaults } from './specification';
import Matrix from './components/Matrix.svelte';
import MatrixWithUI from './components/MatrixWithUI.svelte';
import type { Spec } from './specification';
import { spec as specStore } from './components/stores.js';

export function embed(
    id: string,
    spec: Spec,
    confusions: Array<Confusion>,
): void {
    const ref = document.getElementById(id);
    if (!ref) {
        console.warn(`Could not find container "${id}"`);
    }

    specStore.set({ ...defaults, ...spec });

    new MatrixWithUI({
        target: ref,
        props: { confusions },
    });
}

export function embedElement(
    element: HTMLElement,
    spec: Spec,
    confusions: Array<Confusion>,
): void {
    specStore.set({ ...defaults, ...spec });

    new MatrixWithUI({
        target: element,
        props: { confusions },
    });
}

export function embedWithoutUI(
    id: string,
    spec: Spec,
    confusions: Array<Confusion>,
): void {
    const ref = document.getElementById(id);
    if (!ref) {
        console.warn(`Could not find container "${id}"`);
    }

    specStore.set({ ...defaults, ...spec });

    new Matrix({
        target: ref,
        props: { confusions },
    });
}

export function embedElementWithoutUI(
    element: HTMLElement,
    spec: Spec,
    confusions: Array<Confusion>,
): void {
    specStore.set({ ...defaults, ...spec });

    new Matrix({
        target: element,
        props: { confusions },
    });
}
