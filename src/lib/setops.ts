/*
 * For licensing see accompanying LICENSE file.
 *
 * Copyright (C) 2022 Apple Inc. All Rights Reserved.
 */

// TODO: We could use generator functions to explore the full space with constand memory.
export function powerset<T>(elements: Array<T>): Array<Set<T>> {
    return elements.reduce(
        (acc: Array<Set<T>>, value: T) => {
            return acc.concat(acc.map((set) => new Set([value, ...set])));
        },
        [new Set<T>()]
    );
}

export function nest<T>(parent: Array<T>, sub: Array<T>): Array<Array<T>> {
    // Prepopulate the array because sub is optional
    const result = [...parent.map((p) => [p])];
    for (const p of parent) {
        for (const s of sub) {
            result.push([p, s]);
        }
    }
    return result;
}
